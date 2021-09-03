"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const request_1 = __importDefault(require("request"));
const jsdom_1 = __importDefault(require("jsdom"));
const url_1 = __importDefault(require("url"));
/*
implement your server code here
*/
const { JSDOM } = jsdom_1.default;
const server = http_1.default.createServer((req, res) => {
    if (req.method === "GET") {
        const urlObj = new url_1.default.URL(req.url, `http://${req.headers.host}`);
        const urlToParse = urlObj.searchParams.get('url');
        console.log(urlToParse);
        if (urlToParse) {
            request_1.default.get(urlToParse, (err, response, body) => {
                var _a, _b;
                if (!err && response.statusCode == 200) {
                    console.log(typeof body);
                    let dom = new JSDOM(body);
                    let imgUrls = Array.from(dom.window.document.querySelectorAll('img')).map(img => img === null || img === void 0 ? void 0 : img.getAttribute('src')).filter(imgurl => imgurl === null || imgurl === void 0 ? void 0 : imgurl.toString());
                    let title = (_a = dom.window.document.querySelector('title')) === null || _a === void 0 ? void 0 : _a.textContent;
                    let description = (_b = dom.window.document.querySelector('meta[name="description"]')) === null || _b === void 0 ? void 0 : _b.getAttribute('content');
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        title,
                        description,
                        imgUrls
                    }, null, " "));
                }
                else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        status: 'error',
                        message: 'Unable to find the website.'
                    }, null, " "));
                }
            });
        }
        else {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                status: 'error',
                message: 'Invalid url'
            }, null, " "));
        }
    }
});
const port = 3001;
server.listen(port, () => { console.log(`listening on ${port}`); });
