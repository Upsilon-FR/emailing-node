import contacts from './contacts/index'

export default {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'ESGI Emailing API',
    description: 'By Eduard Serban & Nicolas Lacoste',
    contact: {
      name: 'ESGI Contact',
      email: 'info@esgi.fr',
      url: 'https://esgi.fr',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server',
    },
  ],
  paths: {
    ...contacts.paths,
  },
  components: {
    schemas: {
      ...contacts.schema,
    },
  },
}
