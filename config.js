exports.url = "http://127.0.0.1:3000";

exports.loop = [
    {
        name: "1st Call /leak API",
        endpoint: "http://127.0.0.1:3000",
        check: () => { },
        next: () => { },
    },
    {
        name: "1st Call /leak API",
        endpoint: "http://127.0.0.1:3000",
        check: () => { },
        next: () => { },
    },
    {
        name: "1st Call /leak API",
        endpoint: "http://127.0.0.1:3000",
        check: () => { },
        next: () => { },
    },
];
exports.timeout = 30000;
exports.iterations = 3;
exports.postCheckSleep = 500;