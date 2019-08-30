const path = require('path');

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/html/index.html"));
    }),

    app.get("/js/app", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/js/index.js"));
    }),

    app.get("/css/style", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/css/style.css"));
    }),

    app.get("/images/bg", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/images/bg.png"));
    })
};