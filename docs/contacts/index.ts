import get from "./get";
import schema from "./_model";
import add from "./add";
import updateName from "./update.name";
import updateEmail from "./update.email";
import deleteContact from "./delete";
import getAll from "./get.all";

export default {
  paths: {
    "/contact/{id}": {
      ...get,
      ...deleteContact,
    },
    "/contact/name/{id}": {
      ...updateName,
    },
    "/contact/email/{id}": {
      ...updateEmail,
    },
    "/contact": {
      ...add,
    },
    "/contact/all": {
      ...getAll,
    },
  },
  schema: {
    ...schema,
  },
};
