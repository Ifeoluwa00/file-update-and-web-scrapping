import fs from "fs";
import { IncomingMessage } from "http";

export interface UserObj {
  [title: string] : string | number | string[]
}


export function writeDataToFile(filename:string, content:UserObj[]) {
  fs.writeFile(filename, JSON.stringify(content, null, 4), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  })
}

export function getPostData(req:IncomingMessage){
  return new Promise((resolve, reject) => {
    try {
      let body = ''
      
      req.on('data', (chunk) => {
        body+=chunk.toString()
      })
      req.on('end', () => {
        resolve(body)
      })
    } catch (error) {
      reject(error)
      
    }
  })
}