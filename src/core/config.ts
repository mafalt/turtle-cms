import { DatabaseConfig } from "./dbconfig";
import { getNumberFromString } from "../helpers/convert";

export class Config {
    private _dbConfig: DatabaseConfig;

    constructor(dbConfig?: DatabaseConfig) {
        this._dbConfig = new DatabaseConfig(
            process.env.DB_HOST,
            getNumberFromString(process.env.DB_PORT),
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASSWORD
        );
    }

    get dbConfig(): DatabaseConfig {
        return this._dbConfig;
    }
}
