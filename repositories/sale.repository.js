import Sale from "../models/sale.model.js";
import Product from "../models/product.model.js";
import Client from "../models/client.model.js";

async function insertSale(sale) {
  try {
    return await Sale.create(sale);
  } catch (err) {
    throw err;
  }
}

async function getSales() {
  try {
    return await Sale.findAll({
      include: [
        {
          model: Product,
        },
        {
          model: Client,
        },
      ],
    });
  } catch (err) {
    throw err;
  }
}

async function getSale(id) {
  try {
    return await Sale.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function updateSale(sale) {
  try {
    await Sale.update(
      // nao podemos alterar o Id do produto
      // passamos aqui os dados para serem alterados, pois nao podemos alterar todos
      {
        value: sale.value,
        date: sale.date,
        clientId: sale.clientId,
      },
      {
        where: {
          saleId: sale.saleId,
        },
      }
    );
    return await getSale(sale.saleId);
  } catch (err) {
    throw err;
  }
}

async function deleteSale(id) {
  try {
    await Sale.destroy({
      where: { saleId: id },
    });
  } catch (err) {
    throw err;
  }
}

async function getSalesByProductId(productId) {
  try {
    return await Sale.findAll({
      where: {
        productId: productId,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getSalesBySupplierId(supplierId) {
  try {
    return await Sale.findAll({
      include: [
        {
          model: Product,
          where: {
            supplierId: supplierId,
          },
        },
      ],
    });
  } catch (err) {
    throw err;
  }
}

export default {
  insertSale,
  getSales,
  getSale,
  updateSale,
  deleteSale,
  getSalesByProductId,
  getSalesBySupplierId,
};
