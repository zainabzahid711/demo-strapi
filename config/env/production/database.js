// config/env/production/database.js
module.exports = ({ env }) => ({
    connection: {
      client: 'postgres',
      connection: {
        connectionString: env('DATABASE_URL'), // Always use env variable!
        ssl: { 
          rejectUnauthorized: false // Required for Neon
        }
      },
      pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 30000
      }
    }
  });