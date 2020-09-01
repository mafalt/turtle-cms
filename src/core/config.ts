import { DatabaseConfig } from "./dbconfig";

export class Config {
    private _dbConfig: DatabaseConfig;

    constructor(dbConfig?: DatabaseConfig) {
        this._dbConfig = dbConfig;
    }

    get dbConfig(): DatabaseConfig {
        return this._dbConfig;
    }
}
