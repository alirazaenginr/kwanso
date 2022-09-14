import BaseModel from "../../base/class/BaseModel";

class TaskModel extends BaseModel {
  static TABLE_NAME = "tasks";
  constructor(
    public id: number,
    public name: string,
    public created_at: string,
  ) { super(id, created_at); }

  static col = (k: keyof TaskModel, prefix: boolean = false): string => 
    (prefix ? `${this.TABLE_NAME}.${k}` : k) as string;
}

export default TaskModel;
