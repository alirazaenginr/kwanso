import cors from 'cors';
import appRouter from "./router";
import express, { Application } from "express";
import knex from "./modules/base/database/knex";
import { SystemEvent } from './modules/shared/enums/Enum';
import Utilities from "./modules/base/utilities/Utilities";
import AppConfigs from "./modules/base/configs/AppConfigs";
import Middleware from "./modules/shared/middleware/Middleware";

const {
  Print,
  Logger,
  getNodeEnv,
  isDevelopment,
  SecurityLayer,
} = Utilities;

const {
  NotFound,
  errorHandler,
} = Middleware;

const { EXIT } = SystemEvent;

const app: Application = express();

app.use(
  express.json({ 
    limit: AppConfigs.expressJson.limit() 
  })
);
app.use(
  express.urlencoded({
    extended: AppConfigs.expressJson.extended(),
  })
);

if(isDevelopment()) {
  app.use(Logger());
}

app.use(isDevelopment() ? SecurityLayer({ crossOriginResourcePolicy: false }) : SecurityLayer());

app.use(cors());

app.use(appRouter);
app.use(errorHandler);
app.use(NotFound);

export const start = (): void => {
  app.listen(AppConfigs.port(), () => 
    knex
      .raw(`SELECT 1+1`)
      .then(() => { 
          Print(
            `\nApp Name: ${AppConfigs.name()}`,
            `\nServer Started at Port: ${AppConfigs.port()}`,
            `\nNode Environment: ${getNodeEnv()}`,
            `\n${AppConfigs.database.name()} Database is Connected`,
          );
        }
      )
      .catch((err: string) => {
        process.on(EXIT, () =>
          Print(`${err}\n`, `Error Occured while connecting to ${AppConfigs.database.name()} Database\n`)
        );
        process.exit(1);
      })
  );
}
