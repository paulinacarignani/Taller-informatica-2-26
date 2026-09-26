const express = require("express");
const fs = require("fs/promises");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res, next) => {
  try {
    const rutaHTML = path.join(__dirname, "index.html");
    const contenido = await fs.readFile(rutaHTML, "utf8");

    res.status(200).type("html").send(contenido);
  } catch (error) {
    if (error.code === "ENOENT") {
      return res.status(404).send("404 - No se encontró index.html");
    }

    next(error);
  }
});

app.use((req, res) => {
  res.status(404).send("404 - Ruta no encontrada");
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("500 - Error interno del servidor");
});

app.listen(PORT, () => {
  console.log(`Servidor Express activo en http://localhost:${PORT}`);
});
