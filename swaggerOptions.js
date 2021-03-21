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
        description: 'Definition of a product to be created in the database',
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
        description: 'Definition of a product to be updated in the database',
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
      Category: {
        type: 'object',
        description: 'Definition of a category to be updated or created in the database',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            example: 'Sports'
          }
        }
      }
    }
  },
  apis: ['./controllers/categories.js', './controllers/products.js']
};

module.exports = swaggerOptions;
