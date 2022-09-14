import BaseModel from "../../base/class/BaseModel";

class UserModel extends BaseModel {
  static TABLE_NAME = "users";
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public jwt: string,
    public created_at: string,
  ) { super(id, created_at); }

  static col = (k: keyof UserModel, prefix: boolean = false): string => 
    (prefix ? `${this.TABLE_NAME}.${k}` : k) as string;
}

export default UserModel;
