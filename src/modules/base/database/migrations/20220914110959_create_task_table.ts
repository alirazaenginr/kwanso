import { Knex } from "knex";
import { Database } from "../../../shared/enums/Enum";
import TaskModel from "../../../public/tasks/TaskModel";

const { NOW } = Database;
const { col } = TaskModel;

export const up = async (knex: Knex): Promise<void> => 
  await knex
    .schema
    .createTable(TaskModel.TABLE_NAME, table => {
      table.increments(col("id")).primary();
      table.string(col("name"), 100);
      table.dateTime(col("created_at")).defaultTo(knex.raw(NOW));
    });


export const down = async (knex: Knex): Promise<void> =>
  await knex.schema.dropTable(TaskModel.TABLE_NAME);
