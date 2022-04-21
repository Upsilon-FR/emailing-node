export default {
  get: {
    tags: ['Contact'],
    description: 'Get All Contacts',
    operationId: 'getAllContacts',
    parameters: [],
    responses: {
      200: {
        description: 'Get all contacts',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/contacts',
            },
          },
        },
      },
    },
  },
}
