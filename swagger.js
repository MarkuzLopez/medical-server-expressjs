const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración de Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'API Documentation for my Express app',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
        ApiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'x-token',
        },
    //   bearerAuth: {
    //     type: 'http',
    //     scheme: 'bearer',
    //     bearerFormat: 'JWT',
    //   },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Ruta a los archivos donde se documentan las rutas de la API
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
