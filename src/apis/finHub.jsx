import axios from "axios";

const TOKEN = "chspcehr01qr5oci4q40chspcehr01qr5oci4q4g";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN,
  },
});
