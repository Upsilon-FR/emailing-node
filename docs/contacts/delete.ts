export default {
  delete: {
    tags: ["Contact"],
    description: "Delete contact",
    operationId: "deleteContact",
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
        description: "Contact delete successfully",
      },
      400: {
        description: "Error",
      },
    },
  },
};
