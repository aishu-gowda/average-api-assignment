
const http = require("http");
const fs = require("fs");
const path = require("path");

let numbers = [];
/**
 * Creates the HTTP server for the Average Calculator.
 *
 * GET /              Serves the front-end HTML page.
 * POST /average      Accepts a number and returns the running average.
 * Other routes       Return a 404 error.
 *
 * @type {import("node:http").Server}
 */
const server = http.createServer((request, response) => {
    // Display the front-end page
    if (
        request.method === "GET" &&
        (request.url === "/" || request.url === "/index.html")
    ) {
        const filePath = path.join(
            __dirname,
            "../public/index.html"
        );

        fs.readFile(filePath, "utf8", (error, html) => {
            if (error) {
                response.writeHead(500, {
                    "Content-Type": "text/plain"
                });
                response.end("Could not load the web page.");
                return;
            }

            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });
            response.end(html);
        });

        return;
    }

    // Handle the average API
    if (request.method === "POST" && request.url === "/average") {
        let body = "";

        request.on("data", (chunk) => {
            body += chunk;
        });

        request.on("end", () => {
            try {
                const data = JSON.parse(body);
                const number = data.number;

                if (
                    typeof number !== "number" ||
                    !Number.isFinite(number)
                ) {
                    response.writeHead(400, {
                        "Content-Type": "application/json"
                    });
                    response.end(JSON.stringify({
                        error: "Please provide a valid number."
                    }));
                    return;
                }

                numbers.push(number);
// Add all submitted numbers, then divide by their count.
                const sum = numbers.reduce(
                    (total, current) => total + current,
                    0
                );

                const average = sum / numbers.length;

                response.writeHead(200, {
                    "Content-Type": "application/json"
                });

                response.end(JSON.stringify({
                    average: Number(average.toFixed(2)),
                    count: numbers.length
                }));
            } catch (error) {
                response.writeHead(400, {
                    "Content-Type": "application/json"
                });

                response.end(JSON.stringify({
                    error: "Invalid JSON."
                }));
            }
        });

        return;
    }

    // Handle unknown URLs
    response.writeHead(404, {
        "Content-Type": "application/json"
    });

    response.end(JSON.stringify({
        error: "Route not found."
    }));
});
if (require.main === module) {
    const PORT = process.env.PORT || 3000;

    server.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = server;
