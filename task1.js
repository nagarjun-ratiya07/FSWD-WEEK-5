const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 1409;
const LOG_FILE = path.join(__dirname, "visits.log");


app.use((req, res, next) => {
    const logEntry = `${new Date().toISOString()} - IP: ${req.ip}\n`;
    fs.appendFile(LOG_FILE, logEntry, (err) => {
        if (err) console.error("Error writing to log file:", err);
    });
    next();
});


app.use(express.static(path.join(__dirname, "public")));


app.get("/logs", (req, res) => {
    fs.readFile(LOG_FILE, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Could not read log file" });
        }
        const logs = data.trim().split("\n").map(line => {
            const [time, ip] = line.split(" - IP: ");
            return { time, ip };
        });
        res.json(logs);
    });
});


app.listen(PORT, () => {
    console.log(`Server starts at PORT at ${PORT}`);
});