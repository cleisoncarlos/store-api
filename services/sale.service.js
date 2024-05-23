import SaleRepository from "../repositories/sale.repository.js";

import ClientRepository from '../repositories/client.repository.js'
import ProductRepository from "../repositories/product.repository.js";


async function createSale(sale) {

    // validação se os relacionamentos existem
    if(!await ClientRepository.getClient(sale.client_id)){
        throw new Error("O client_id informado não existe!")
    }

    const  product = await ProductRepository.getProduct(sale.product_id)

    if(!product){
        throw new Error("O product_id informado não existe!")
    }
    
    // consulta ao estoque
    if (product.stock > 0) {
        const newSale = await SaleRepository.insertSale(sale);
        product.stock--;
        await ProductRepository.updateProduct(product);
        return newSale;
    } else {
        throw new Error("O produto não está disponível em estoque!");
    }

    }




async function getSales() {
  return await SaleRepository.getSales();
}

async function getSale(id) {
  return await SaleRepository.getSale(id);
}

async function updateSale(sale) {
    if(!await ClientRepository.getClient(sale.client_id)){
        throw new Error("O client_id informado para edição não existe!")
    }
    if(!await ProductRepository.getProduct(sale.product_id)){
        throw new Error("O product_id informado para edição não existe!")
    }

    await SaleRepository.updateSale(sale);
}

async function deleteSale(id) {

    const sale = await SaleRepository.getSale(id);
    if(sale){
      const product =   await ProductRepository.getProduct(sale.product_id)
        await SaleRepository.deleteSale(id);
        product.stock++;
        await ProductRepository.updateProduct(product)
    } else {
      throw new Error  ('O id do sale informado não existe !')
    }

    
    await SaleRepository.deleteSale(id);

// volta com o item para o estoque


    

  }


export default {
  createSale,
   getSales,
   getSale,
   updateSale,
   deleteSale
};
