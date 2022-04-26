export default {
  contact: {
    type: "object",
    properties: {
      firstName: {
        type: "String",
        description: "First Name of contact",
        example: "Nicolas",
      },
      lastName: {
        type: "String",
        description: "Last Name of contact",
        example: "Lacoste",
      },
      email: {
        type: "String",
        description: "Mail of contact",
        example: "nlacoste@myges.fr",
      },
    },
  },
  contactUpdate: {
    type: "object",
    properties: {
      id: {
        type: "number",
        description: "Id of contact",
        example: 2,
      },
      firstname: {
        type: "String",
        description: "First Name of contact",
        example: "Nicolas",
      },
      lastname: {
        type: "String",
        description: "Last Name of contact",
        example: "Lacoste",
      },
      mail: {
        type: "String",
        description: "Mail of contact",
        example: "nlacoste@myges.fr",
      },
    },
  },
  contacts: {
    type: "object",
    additionalProperties: {
      $ref: "#/components/schemas/contact",
    },
  },
};
