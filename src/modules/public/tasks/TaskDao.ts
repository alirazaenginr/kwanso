import { Knex } from "knex";
import TaskModel from "./TaskModel";

class TaskDao {
  addTask = async (trx: Knex.Transaction, task: Partial<TaskModel>): Promise<void> =>
    await trx(TaskModel.TABLE_NAME)
      .insert(task);

  getTasks = async (trx: Knex.Transaction) =>
    await trx(TaskModel.TABLE_NAME)
      .select(
        TaskModel.col("id"),
        TaskModel.col("name"),
      );
  
  getTaskByName = async (trx: Knex.Transaction, name: string): Promise<TaskModel> =>
    await trx(TaskModel.TABLE_NAME)
      .where(TaskModel.col("name"), name)
      .first();
}

export default TaskDao;
