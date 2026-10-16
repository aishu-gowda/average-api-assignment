
const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const server = require("../src/server");

let baseUrl;

before(async () => {
    await new Promise((resolve) => {
        server.listen(0, "127.0.0.1", resolve);
    });

    baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
    await new Promise((resolve, reject) => {
        server.close((error) => {
            if (error) reject(error);
            else resolve();
        });
    });
});

test("First submitted number returns the correct average", async () => {
    const response = await fetch(`${baseUrl}/average`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: 10 })
    });

    const data = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(data, { average: 10, count: 1 });
});

test("Multiple numbers return the running average", async () => {
    const response = await fetch(`${baseUrl}/average`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: 20 })
    });

    const data = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(data, { average: 15, count: 2 });
});

test("Invalid number is rejected", async () => {
    const response = await fetch(`${baseUrl}/average`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: "hello" })
    });

    const data = await response.json();

    assert.equal(response.status, 400);
    assert.ok(data.error);
});

test("Invalid JSON is rejected", async () => {
    const response = await fetch(`${baseUrl}/average`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{invalid json"
    });

    const data = await response.json();

    assert.equal(response.status, 400);
    assert.equal(data.error, "Invalid JSON.");
});

test("Unknown route returns 404", async () => {
    const response = await fetch(`${baseUrl}/unknown`);

    const data = await response.json();

    assert.equal(response.status, 404);
    assert.equal(data.error, "Route not found.");
});

test("Home page displays the front end", async () => {
    const response = await fetch(`${baseUrl}/`);

    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(html, /Average Calculator/);
});
