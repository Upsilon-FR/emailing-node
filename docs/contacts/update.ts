export default {
  patch: {
    tags: ["Contact"],
    description: "update contact",
    operationId: "updateContact",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/contactUpdate",
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
