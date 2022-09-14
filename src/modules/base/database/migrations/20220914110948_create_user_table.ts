import { Knex } from "knex";
import { Database } from '../../../shared/enums/Enum';
import UserModel from "../../../public/users/UserModel";

const { NOW } = Database;
const { col } = UserModel;

export const up = async (knex: Knex): Promise<void> => 
  await knex
    .schema
    .createTable(UserModel.TABLE_NAME, table => {
      table.increments(col("id")).primary();
      table.string(col("email"), 100).notNullable().unique();
      table.string(col("password"), 100);
      table.string(col("jwt"), 500);
      table.dateTime(col("created_at")).defaultTo(knex.raw(NOW));
    });

export const down = async (knex: Knex): Promise<void> => 
  await knex.schema.dropTable(UserModel.TABLE_NAME);
