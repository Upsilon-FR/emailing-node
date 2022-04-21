import get from './get';
import schema from './_model';
import add from './add';
import updateName from './update.name';
import updateEmail from './update.email';
import deleteContact from './delete';
import getAll from './get.all';

export default {
  paths: {
    '/contacts/{id}': {
      ...get,
      ...deleteContact,
    },
    '/contacts/name/{id}': {
        ...updateName,
    },
    '/contacts/email/{id}': {
        ...updateEmail,
    },
    '/contacts': {
        ...add,
        ...getAll,
    },
  },
  schema: {
    ...schema,
  },
}
