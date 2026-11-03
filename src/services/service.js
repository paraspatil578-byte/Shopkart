import axios from "axios";

// Paste YOUR MockAPI base URL here
const API_URL = "https://6ae99add3d3dd3d37be54961.mockapi.io/shopkart";

const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response;
};

const getProductDetails = async () => {
  const response = await axios.get(`${API_URL}/productDetails`);
  return response;
};

export { getProducts, getProductDetails };