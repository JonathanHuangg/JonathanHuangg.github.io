// Serves the site and checks what it actually contains: real content, no
// template leftovers, every project link pointing at a repo that exists,
// and consistent filter data. Run with: npm test
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const http = require("http");
const path = require("path");

const root = path.join(__dirname, "..");

// Every repo on Jonathan's public profile, verified via the GitHub API on
// 2026-11-09. A project link naming anything outside this list fails.
const KNOWN_REPOS = new Set([
    "4641", "Advent-of-Code", "AdventOfCode", "AutoLLMTuner", "AutomataThings",
    "Call-Recorder", "ChromeCompetition", "chess_engine", "Diversify",
    "DungeonCrawler", "ForFun", "Google-Extensions", "HomeSecuritySystem-iPhone",
    "ImmerseGTResturantMenu", "JonathanHuangg", "JonathanHuangg.github.io",
    "LearningRust", "LevelsMod-Mod", "LLM_Minecraft", "Locative-Media-Project-Code",
    "Poker", "profiler", "PycraftCNN", "Python-Camp", "Python-Class",
    "Ramp-Challenge", "Rush-App", "SwiftUIViews1", "tutorial_app",
    "UnityFPSMicrogameTutorial", "Vosik",
]);

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");

function serve() {
    return new Promise((resolve) => {
        const server = http.createServer((req, res) => {
            const file = path.join(root, req.url === "/" ? "index.html" : req.url);
            if (!file.startsWith(root) || !fs.existsSync(file)) {
                res.writeHead(404);
                res.end("not found");
                return;
            }
            const type = file.endsWith(".svg") ? "image/svg+xml" : "text/html";
            res.writeHead(200, { "content-type": type });
            res.end(fs.readFileSync(file));
        });
        server.listen(0, "127.0.0.1", () => resolve(server));
    });
}

test("the site serves and carries the real content", async () => {
    const server = await serve();
    try {
        const body = await new Promise((resolve, reject) => {
            http.get(`http://127.0.0.1:${server.address().port}/`, (res) => {
                assert.equal(res.statusCode, 200);
                let data = "";
                res.on("data", (chunk) => (data += chunk));
                res.on("end", () => resolve(data));
            }).on("error", reject);
        });
        assert.ok(body.includes("<h1>Innovate.<br><em>Learn.</em><br>Grow.</h1>"));
        assert.ok(body.includes("Jonathan Huang"));
        assert.ok(body.includes("Georgia Tech"));
    } finally {
        server.close();
    }
});

test("no template or placeholder text remains", () => {
    for (const banned of [
        "Chillaid", "OS Templates", "os-templates", "Lorem", "Link Text",
        "Big brain learning", "TODO", "FIXME",
    ]) {
        assert.ok(!html.includes(banned), `index.html still contains: ${banned}`);
    }
});

test("structure: one h1, title, viewport, no images to go stale", () => {
    assert.equal((html.match(/<h1>/g) || []).length, 1);
    assert.ok(html.includes("<title>Jonathan Huang"));
    assert.ok(html.includes('name="viewport"'));
    assert.equal((html.match(/<img/g) || []).length, 0);
});

test("every project link names a repo that exists", () => {
    const links = [...html.matchAll(/github\.com\/JonathanHuangg\/([A-Za-z0-9_.-]+)/g)].map((m) => m[1]);
    assert.ok(links.length >= 12, `expected at least 12 repo links, found ${links.length}`);
    for (const repo of links) {
        assert.ok(KNOWN_REPOS.has(repo), `link to unknown repo: ${repo}`);
    }
});

test("no external resources except GitHub links", () => {
    for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
        const url = match[1];
        assert.ok(
            url.startsWith("#") ||
                url.startsWith("https://github.com/") ||
                (!url.includes("://") && !url.startsWith("//")),
            `external resource: ${url}`,
        );
    }
});

test("filter data is consistent", () => {
    const filters = [...html.matchAll(/data-filter="([^"]+)"/g)].map((m) => m[1]);
    assert.deepEqual(filters, ["all", "ai-ml", "apps", "games"]);
    const categories = [...html.matchAll(/data-category="([^"]+)"/g)].map((m) => m[1]);
    assert.equal(categories.length, 10);
    const counts = {};
    for (const category of categories) counts[category] = (counts[category] || 0) + 1;
    assert.deepEqual(counts, { "ai-ml": 4, apps: 4, games: 2 });
    for (const category of new Set(categories)) {
        assert.ok(filters.includes(category), `no filter button for category: ${category}`);
    }
});
