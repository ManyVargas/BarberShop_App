import { services } from "../data/barberShopServices.js";

const createService = async (req, res) => {
  console.log('Desde')
}

const getServices = (req, res) => {
  res.json(services);
};

export {
  getServices,
  createService
};
