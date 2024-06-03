import ProductRepository from "../repositories/product.repository.js";
import SupplierRepository from "../repositories/supplier.repository.js";
import SaleRepository from '../repositories/sale.repository.js'
import ProductInfoRepository from "../repositories/productInfo.repository.js";


async function createProduct(product) {
    if(await SupplierRepository.getSupplier(product.supplier_id)){
        return await ProductRepository.insertProduct(product);
    }
    throw new Error('O supplier_id  informado neste produto não existe!')
}

async function getProducts() {
  return await ProductRepository.getProducts();
}

async function getProduct(id) {
 const product = await ProductRepository.getProduct(id);
 product.info = await ProductInfoRepository.getProductInfo(parseInt(id))

 return product;
}

async function updateProduct(product) {
    if(await SupplierRepository.getSupplier(product.supplierId)){
        return await ProductRepository.updateProduct(product);
    }    
    throw new Error('O supplier_id  informado na edição deste produto não existe!')    
}

async function deleteProduct(id) {
const sales = await SaleRepository.getSale(id)

if (sales) {
  throw new Error ('Não é possivel excluir o produto, pois ele tem vendas')
}

    await ProductRepository.deleteProduct(id);
  }





  // mongodb
  async function createProductInfo(productInfo){
    await ProductInfoRepository.createProductInfo(productInfo)

  }

  async function updateProductInfo(productInfo){
    await ProductInfoRepository.updateProductInfo(productInfo)

  }


export default {
  createProduct,
   getProducts,
   getProduct,
   updateProduct,
   deleteProduct,
   createProductInfo,
   updateProductInfo
};
