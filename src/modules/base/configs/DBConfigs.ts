import path from 'path';

const DBConfigs = {
  client: "mysql2",
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: path.join(__dirname, "../database/migrations"),
  },
  seeds: {
    directory: path.join(__dirname, "../database/seeds"),
  },
};

export default DBConfigs;
