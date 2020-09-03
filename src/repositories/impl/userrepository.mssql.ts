import * as sql from "mssql";
import { Repository } from "../abstractrepository";
import { UserRepository } from "../userrepository";
import { Query } from "../../core/data/query";
import { SqlParameter } from "../../core/data/sqlparameter";
import { ValidatedUser } from "../../models/usermodels";
import { Role } from "../../models/rolemodels";

type DbUser = {
    id: number,
    username: string,
    password: string,
    fullname: string,
    isAdmin: boolean,
    isMember: boolean
};

export class MSSQLUserRepository extends Repository implements UserRepository {

    async validateLogin(username: string, password: string): Promise<import("../../models/usermodels").ValidatedUser> {
        const result: sql.IResult<DbUser> = await this.db.query(new Query("SELECT id, username, password, fullname, is_admin, is_member FROM users WHERE username = @username", [
            new SqlParameter("username", sql.NVarChar(100), username)
        ]));

        if (!result || result.recordsets.length === 0) {
            throw new Error("Invalid login name or password");
        }

        const userDb = result.rowsAffected[0] !== 1 ? result.recordset[0] : null;
        if (!userDb) {
            throw new Error("Invalid login name or password");
        }

        if (userDb.password !== password) {
            throw new Error("Invalid login name or password");
        }

        const roles: Role[] = [];
        return new ValidatedUser(userDb.id, userDb.username, userDb.fullname, userDb.isAdmin, userDb.isMember, roles);
    }

}
