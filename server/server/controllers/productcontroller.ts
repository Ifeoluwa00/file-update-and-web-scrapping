import Product from "../models/productModel"
import { IncomingMessage, ServerResponse } from "http";
import { getPostData, UserObj} from "../utils"
//@desc Get All Product
//@route Get /api/products
async function getProducts(req: IncomingMessage, res:ServerResponse) {

  const products = await Product.findAll()
  if (!products) {
    res.writeHead(404, { "Content-Type": "application/json" })
    res.end(JSON.stringify({message: "DataBase Not Found make a post"})) 
  } else {
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify(products)) 
  }
}

//@desc Get single Product
//@route Get /api/product/:id
async function getProduct(req: IncomingMessage, res:ServerResponse, id: number) {
  try {
    const product = await Product.findById(id)
    
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" })
     res.end(JSON.stringify({message: "Product Not Found"})) 
    } else {
      res.writeHead(200, { "Content-Type": "application/json" })
     res.end(JSON.stringify(product)) 
    }
   
  } catch (error) {
   console.log(error)
  }
}
 
//@desc Create a Product
//@route POST /api/products
async function createProduct(req: IncomingMessage, res:ServerResponse) {
  try {
    const body = await getPostData(req) as string  
    const{organization, products, marketValue, address, ceo, country, noOfEmployees, employees}= JSON.parse(body)
    const product: UserObj  = {
      organization,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      products,
      marketValue,
      address,
      ceo,
      country,
      noOfEmployees,
      employees
    }
    const newProduct = await Product.create(product)
  res.writeHead(201, { "Content-Type": "application/json" })
  return res.end(JSON.stringify(newProduct))
    

  } catch (error) {
   console.log(error)
  }
 }

//@desc Update a Product
//@route PUT /api/products/:id
async function updateProduct(req: IncomingMessage, res:ServerResponse, id:number) {
  try {
    const product = await Product.findById(id)
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" })
      res.end(JSON.stringify({ message: "Product Not Found" }))
    } else {
      const body = await getPostData(req) as string
      const { organization, products, marketValue, address, ceo, country, noOfEmployees, employees } = JSON.parse(body)
      const productData: UserObj = {
        organization: organization || product.organization,
        createdAt: product.createdAt,
        updatedAt: new Date().toISOString(),
        products: products || product.products,
        marketValue: marketValue || product.marketValue,
        address: address || product.address,
        ceo: ceo || product.ceo,
        country: country || product.country,
        noOfEmployees: noOfEmployees || product.noOfEmployees,
        employees: employees || product.employees
      }
      const updProduct = await Product.update(id, productData)
      res.writeHead(200, { "Content-Type": "application/json" })
      return res.end(JSON.stringify(updProduct))
    }
  } catch (error) {
   console.log(error)
  }
 }

//@desc Delete Product
//@route DELETE /api/product/:id
async function deleteProduct(req: IncomingMessage, res:ServerResponse, id: number) {
  try {
    const product = await Product.findById(id)
    
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" })
     res.end(JSON.stringify({message: "Product Not Found"})) 
    } else {
      await Product.remove(id)
      res.writeHead(200, { "Content-Type": "application/json" })
     res.end(JSON.stringify({message: `Product ${id} removed`})) 
    }
   
  } catch (error) {
   console.log(error)
  }
}

export = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
   
}