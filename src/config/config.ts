export const config = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  database: {
    name: process.env.DB_NAME || 'mydb',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PWD || 'password',
  },
  logDirectory: process.env.LOG_DIR || './logs',
};
