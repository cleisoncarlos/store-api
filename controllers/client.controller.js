import ClientService from "../services/client.service.js";

async function createClient(req, res, next) {
  try {
    let client = req.body;
    if (
      !client.name ||
      !client.cpf ||
      !client.phone ||
      !client.email ||
      !client.address
    ) {
      throw new Error("Todas as informações são obrigatórias !");
    }
    client = await ClientService.createClient(client);
    res.send(client);
    logger.info(`POST / client - ${JSON.stringify(client)}`);
  } catch (err) {
    next(err);
  }
}

//=======================================================

async function getClients(_req, res, next) {
  try {
    res.send(await ClientService.getClients());
    logger.info("GET /client");
  } catch (err) {
    next(err);
  }
}

//========================

async function getClient(req, res, next) {
  try {
    res.send(await ClientService.getClient(req.params.id));
    logger.info("GET /client");
  } catch (err) {
    next(err);
  }
}

//======================

async function deleteClient(req, res, next) {
  try {
    await ClientService.deleteClient(req.params.id);
    res.end();
    logger.info("DELETE /client");
  } catch (err) {
    next(err);
  }
}

//=============================

async function updateClient(req, res, next) {
  try {
    let client = req.body;
    if (
      !client.clientId ||
      !client.name ||
      !client.cpf ||
      !client.phone ||
      !client.email ||
      !client.address
    ) {
      throw new Error("Todas as informações são obrigatórias !");
    }
    client = await ClientService.updateClient(client);
    res.send(client);
    logger.info(`PUT / client - ${JSON.stringify(client)}`);
    logger.info("PUT /client");
  } catch (err) {
    next(err);
  }
}

export default {
  createClient,
  getClients,
  getClient,
  deleteClient,
  updateClient,
};
