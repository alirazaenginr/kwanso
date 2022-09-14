import DBConfigs from "./DBConfigs";
import { RouterOptions } from "express";

const AppConfigs = {
  name: (): string => "Kwanso",
  port: (): number => process.env.PORT as number | undefined || 9000,
  jsonWebToken: {
    secret: (): string => 'secret',
  },
  expressRouter: (): RouterOptions => ({
    caseSensitive: true,
    strict: true,
  }),
  expressJson: {
    limit: (): string => "100kb",
    extended: (): boolean => false,
  },
  database: {
    name: (): string => "MySQL",
    host: (): string => "localhost",
    port: (): number => 3306,
    development: { 
      ...DBConfigs,
      connection: {
        database: "kwanso",
        user: "root",
        password: "ali",
      },
    },
    production: {
      ...DBConfigs,
      connection: {
        database: "kwanso",
        user: "kwanso",
        password: "kwanso",
      },
    },
  },
};

export default AppConfigs;
