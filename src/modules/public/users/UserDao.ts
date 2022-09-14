import { Knex } from "knex";
import UserModel from "./UserModel";

class UserDao {
  getUserByEmail = async (trx: Knex.Transaction, email: string): Promise<UserModel> => 
    await trx(UserModel.TABLE_NAME)
      .where(UserModel.col("email"), email)
      .first();
  
  addUser = async (trx: Knex.Transaction, user: Partial<UserModel>): Promise<void> =>
    await trx(UserModel.TABLE_NAME)
      .insert(user);

  updateUserById = async (trx: Knex.Transaction, user: Partial<UserModel>, id: number): Promise<number> => 
    await trx(UserModel.TABLE_NAME)
      .update(user)
      .where(UserModel.col("id"), id);
} 

export default UserDao;
