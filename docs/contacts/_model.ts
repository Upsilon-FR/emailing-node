export default {
  contact: {
    type: 'object',
    properties: {
      firstName: {
        type: 'String',
        description: 'First Name of contact',
        example: 'Nicolas',
      },
      lastName: {
        type: 'String',
        description: 'Last Name of contact',
        example: 'Lacoste',
      },
      email: {
        type: 'String',
        description: 'email of contact',
        example: 'nlacoste@myges.fr',
      },
    },
  },
  contactName: {
      type: 'object',
      properties: {
        firstName: {
            type: 'String',
            description: 'First Name of contact',
            example: 'Nicolas',
        },
        lastName: {
            type: 'String',
            description: 'Last Name of contact',
            example: 'Lacoste',
        },
      }
  },
  contactEmail: {
      type: 'object',
      properties: {
        email: {
        type: 'String',
        description: 'email of contact',
        example: 'nlacoste@myges.fr',
        },
      },
  },
  contacts: {
    type: 'object',
    additionalProperties: {
      $ref: '#/components/schemas/contact',
    },
  },
  
}
