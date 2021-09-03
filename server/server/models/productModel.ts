import { writeDataToFile, UserObj } from '../utils'
let products: UserObj[] 
try {
products = require('../../databaseFolder/product.json');
} catch (err) {
 console.log('NO DataBase at the moment, Make a post to create one' )
}



 

function findAll ():Promise<UserObj[]> {
 return new Promise((resolve, reject) => {
  try {
   resolve(products)
  } catch (err) {
   reject (err)
  }
 })
}

function findById(id: number):Promise<UserObj | undefined> {
 return new Promise((resolve, reject) => {
  const product = products.find((p) => p.id === id)
  resolve(product)
 })
}

function create(product: UserObj): Promise<UserObj> {
 return new Promise((resolve, reject) => {
  if (!products) {
   products =[]
  }
  const newProduct = {id:uniid(), ...product}
  products.push(newProduct)
  // console.log(path.resolve('.', './databaseFolder/product.json'))
  writeDataToFile('./databaseFolder/product.json', products)
  resolve(newProduct)
 })
}

function update(id:number, product:UserObj): Promise<UserObj | undefined> {
 return new Promise((resolve, reject) => {
  const index = products.findIndex((p: UserObj) => p.id === id)
  products[index] = {id, ...product}
  writeDataToFile('./databaseFolder/product.json', products)
  resolve(products[index])
 })
}

function remove(id:number) {
 return new Promise((resolve, reject) => {
  products= products.filter((p)=> p.id !== id)
  writeDataToFile('./databaseFolder/product.json', products)
  resolve(null)
 })
}



function uniid() {
 if (products.length === 0) {
  return 1
 } else {
  return Number(products[products.length -1].id) +1
 }
}

export = {
 findAll,
 findById,
 create,
 update,
 remove
}