import { Knex } from "knex";
import TaskModel from "../../../public/tasks/TaskModel";

export const seed = async (knex: Knex): Promise<void> => {
    await knex(TaskModel.TABLE_NAME).del();

    await knex<TaskModel>(TaskModel.TABLE_NAME).insert([
        {
            id: 1,
            name: "First Task",
        }
    ]);
};
