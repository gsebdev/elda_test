import { Sequelize } from 'sequelize';

const dialect = (process.env.DB_DIALECT || 'sqlite') as 'sqlite' | 'postgres';

const sequelizeConfig = {
  logging: false,
  ...(dialect === 'sqlite'
    ? {
        dialect: 'sqlite' as const,
        storage: process.env.DB_STORAGE || './storage/database.sqlite',
      }
    : {
        dialect: 'postgres' as const,
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USER || 'admin',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'db',
      }),
};

export const sequelize = new Sequelize(sequelizeConfig);

export const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Database synced (${dialect})`);
  } catch (error) {
    console.error('DB error:', error);
  }

  const { default: ModelAssociations } = await import('../models/model-associations.js');
  ModelAssociations.initialize();
};
