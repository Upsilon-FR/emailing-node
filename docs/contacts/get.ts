export default {
  get: {
    tags: ['Contact'],
    description: 'Get Contact Informaion',
    operationId: 'getContacts',
    parameters: [
      {
        in: "path",
        required: true,
        type: "integer",
        name: "id",
      },
    ],
    responses: {
      200: {
        description: 'Get contact information',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/contact',
            },
          },
        },
      },
    },
    400: {
      description: 'Impossible de récupérer le contact',
      content: {
        'application/json': {
          schema: { 
            type: 'object',
            properties: {
              error: true, 
              message: "Impossible de récupérer le contact", 
              data: [],
            },
          },
        },
      },
    },
  },
}
