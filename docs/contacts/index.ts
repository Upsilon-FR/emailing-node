import get from "./get";
import schema from "./_model";
import add from "./add";
import deleteContact from "./delete";
import getAll from "./get.all";
import update from "./update";

export default {
  paths: {
    "/contact/{id}": {
      ...get,
      ...deleteContact,
    },
    "/contact/update": {
      ...update,
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
