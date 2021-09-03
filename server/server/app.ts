import http, { IncomingMessage, Server, ServerResponse } from "http";
import controller from './controllers/productcontroller';
  
/*
implement your server code here
*/

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  //console.log(req.url,  req.url?.split("/").slice(-1)[0]);
  if (req.url === "/api/products" && req.method === "GET") {
      controller.getProducts(req, res)
  }
  else if (req.url?.split("/").slice(-1)[0] && req.method === "GET") {
    console.log("valid id")
    const id = req.url.split("/").slice(-1)[0];
    controller.getProduct(req, res, +id);

  } else if (req.url==="/api/products" && req.method=== "POST") {
    controller.createProduct(req, res)
  }
    
  else if (req.url?.split("/").slice(-1)[0] && req.method === "PUT") {
    const id = req.url.split("/").slice(-1)[0];
    controller.updateProduct(req, res, +id)
  }
    
  else if (req.url?.split("/").slice(-1)[0] && req.method === "DELETE") {
    const id = req.url.split("/").slice(-1)[0];
    controller.deleteProduct(req, res, +id)
  }  
    
  else {
    res.writeHead(404, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ message: "Route Not Found"})) 
    }
  }
);


const PORT= process.env.PORT || 3005
server.listen(3005, ()=> console.log(`Server running on port ${PORT}`)); 
 