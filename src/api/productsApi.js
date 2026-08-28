import axios from "axios";

// JSONbin uchun umumiy sozlamalar
const BIN_ID = "6a8d93f8f5f4af5e29404879";
const MASTER_KEY = "$2a$10$9ZrJ0vermQcrMd7fWhW7tePyPuGP2Mmdl4L4rszdlWledgwy2VtR6"; // o'zingning master keying

const api = axios.create({
  baseURL: `https://api.jsonbin.io/v3/b/${BIN_ID}`,
  headers: {
    "X-Master-Key": MASTER_KEY,
  },
});

export const fetchProductsOne = async () => {
  const response = await api.get();
  return response.data.record.arzonNarx; // JSONbin'dagi arzonNarx massivi
};

export const fetchPriductsTwo = async () => {
  const response = await api.get();
  return response.data.record.elektronika; // JSONbin'dagi elektronika massivi
};

export const fetchPriductsThree = async () => {
  const response = await api.get();
  return response.data.record.muddatliTolov; // JSONbin'dagi muddatliTolov massivi
};

export const fetchPriductsFour = async () => {
  const response = await api.get();
  return response.data.record.issiqTexnika; // JSONbin'dagi issiqTexnika massivi
};
