export default {
  patch: {
    tags: ['Contact'],
    description: "update contact email",
    operationId: "updateContactEmail",
    parameters: [
      {
        in: "path",
        required: true,
        type: "integer",
        name: "id",
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/contactEmail",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Contact updated successfully",
      },
      400: {
        description: "Error",
      },
    },
  },
};
