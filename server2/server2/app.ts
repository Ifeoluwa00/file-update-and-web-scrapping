import http, { IncomingMessage, Server, ServerResponse } from "http";
import  request  from "request";
import jsdom from "jsdom"
import url from 'url';
/*
implement your server code here
*/
const { JSDOM } = jsdom



const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET") {
      const urlObj = new url.URL(req.url as string, `http://${req.headers.host}`);
      const urlToParse = urlObj.searchParams.get('url');
      console.log(urlToParse);

      if (urlToParse) {
        request.get( urlToParse, (err, response, body) => {
          if (!err && response.statusCode == 200) {
            console.log(typeof body)
           
            let dom = new JSDOM(body);
            let imgUrls = Array.from( dom.window.document.querySelectorAll('img') ).map(img => img?.getAttribute('src')).filter(imgurl =>  imgurl?.toString() );
            let title = dom.window.document.querySelector('title')?.textContent;
            let description = dom.window.document.querySelector('meta[name="description"]')?.getAttribute('content')
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              title,
              description,
              imgUrls
            }, null, " "))
          }else{
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              status: 'error',
              message: 'Unable to find the website.'
            }, null, " "));
        
          }
        })
      }else{

        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          status: 'error',
          message: 'Invalid url'
        }, null, " "));
      }
      
    }
  }
);
const port = 3001;
server.listen( port, ()=>{ console.log(`listening on ${port}`)});
