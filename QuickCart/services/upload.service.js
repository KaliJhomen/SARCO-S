import axios from "axios";

export const uploadService = {
  async uploadProductImage(file, token) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "http://localhost:4000/api/upload", 
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // El backend responde: { url: "/productos/archivo.jpg" }
    return response.data.url;
  },
};