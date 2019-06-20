export const env = {
  server: {
    PORT: process.env.SERVER_PORT || 3000
  },
  DB: {
    url: process.env.DB_URL || 'mongodb://172.17.0.2/meat-api'
  }
};
