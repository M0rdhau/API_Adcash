const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Adcash API',
      description: 'Backend API for Adcash internship'
    },
    tags: [
      {
        name: 'Products',
        description: 'Product side of API'
      },
      {
        name: 'Categories',
        description: 'Category side of API'
      }
    ],
    definitions: {
      Product: {
        type: 'object',
        required: ['name', 'category'],
        properties: {
          name: {
            type: 'string',
            example: 'Frisbee'
          },
          category: {
            type: 'string',
            example: 'Sports'
          }
        }
      },
      PutProduct: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            example: 'Frisbee'
          },
          category: {
            type: 'string',
            example: 'Sports'
          }
        }
      },
    }
  },
  apis: ['./controllers/categories.js', './controllers/products.js']
};

module.exports = swaggerOptions;
