const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 7000;

let productos;

class Contenedor {
  constructor(archivo) {
    this.filename = archivo;
  }

  getAll = async () => {
    let result = await fs.promises.readFile(this.filename);
    productos = JSON.parse(result);
  };
}

const server = app.listen(PORT, () => {
  console.log(`escuchando el puerto 7000`);
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));

app.get("/productos", (req, res) => {
  res.send(productos);
});

app.get("/productoRandom", (req, res) => {
  const random = productos[Math.floor(Math.random() * productos.length)];

  res.send(random);
});

let contenedor = new Contenedor("productos.txt");

const method = async () => {
  await contenedor.getAll();
};

method();
