import { Knex } from "knex";
import UserModel from "../../../public/users/UserModel";

export const seed = async (knex: Knex): Promise<void> => {
    await knex(UserModel.TABLE_NAME).del();
};
