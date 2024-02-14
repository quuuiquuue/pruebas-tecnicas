const express = require('express');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const port = 3000;
const app = express();

// Definir la información básica de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Productos',
      version: '1.0.0',
      description: 'Una API para administrar productos',
    },
  },
  // Rutas a documentar
  apis: ['app.js'],
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta para obtener todos los productos
/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtiene todos los productos.
 *     responses:
 *       200:
 *         description: Retorna la lista de productos.
 *       500:
 *         description: Error interno del servidor.
 */
app.get('/productos', (req,res) => {
    fs.readFile('files/products.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error interno del servidor');
        } else {
          res.json(JSON.parse(data));
        }
    });
});

// Ruta para obtener un producto por su ID
/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID.
 *     parameters:
 *       - in: path
 *         required: true
 *         description: ID del producto a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retorna el producto correspondiente al ID.
 *       404:
 *         description: Producto no encontrado.
 */
app.get('/productos/:id', (req, res) => {
    const productID = req.params.id;

    if (!productID) {
      return res.status(400).json({ error: 'Missing name query parameter' });
    }

    fs.readFile('files/products.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor');
      } else {
        const jsonData = JSON.parse(data);
        const products = jsonData.products;
        const foundProduct = products.find((product) => product.id === parseInt(productID));

        if (foundProduct) {
          res.json(foundProduct);
        } else {
          res.status(404).json({ error: 'product not found' });
        }
      }
    });
});

// Cargar datos de productos desde el archivo
const productsData = JSON.parse(fs.readFileSync('files/products.json', 'utf8'));

app.get('/products/items', (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  const filteredProducts = productsData.products.filter(product => {
    return Object.values(product).some(value =>
      value && typeof value === 'string' && value.toLowerCase().includes(query.toLowerCase())
    );
  });

  res.json({ items: filteredProducts });
});


const os = require('os');

const server = app.listen(port, () => {
  const serverIp = Object.values(os.networkInterfaces())
    .flat()
    .find((item) => item.family === 'IPv4' && !item.internal);

  console.log(`Servidor escuchando en http://${serverIp.address}:${port}`);
});


module.exports = app;



