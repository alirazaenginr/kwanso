import { Knex } from 'knex';
import TaskDao from './TaskDao';
import knex from '../../base/database/knex';
import { StatusCode } from '../../shared/enums/Enum';
import Utilities from '../../base/utilities/Utilities';
import { MiddlewareType } from '../../shared/types/type';
import { Request, Response, NextFunction } from 'express';

const { Message } = Utilities;
const { SUCCESS, BAD_REQUEST } = StatusCode;

class TaskController {
  static createTask: MiddlewareType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.body;
    try {
      await knex.transaction(async (trx: Knex.Transaction) => {
        const task = await new TaskDao().getTaskByName(trx, name);
        if(task) {
          res.status(BAD_REQUEST).json(Message("This task already exists"));
          return;
        }
        await new TaskDao().addTask(trx, {
          name: name,
        });
        const taskByName = await new TaskDao().getTaskByName(trx, name);
        res.status(SUCCESS).json({
          task: {
            id: taskByName.id,
            name: taskByName.name,
          }
        });
        return;
      });
    } catch(e) {
      next(e);
    }
  }

  static getAllTasks: MiddlewareType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await knex.transaction(async (trx: Knex.Transaction) => {
        res.status(SUCCESS).json({
          tasks: await new TaskDao().getTasks(trx),
        });
        return;
      })
    } catch(e) {
      next(e);
    }
  }
}

export default TaskController;
