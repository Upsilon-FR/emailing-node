export default {
  post: {
    tags: ['Contact'],
    description: "add contact",
    operationId: "addContact",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/contact",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Contact created successfully",
      },
      400: {
        description: "Error",
      },
    },
  },
};
