import { getNumberFromString } from "src/helpers/convert";

export class DatabaseConfig {
    private _hostName: string;
    private _port: number;
    private _dbName: string;
    private _userName: string;
    private _password: string;

    constructor(hostName?: string, port?: number, dbName?: string, userName?: string, password?: string) {
        this._hostName = hostName ? hostName : process.env.DB_HOST;
        this._port = port ? port : getNumberFromString(process.env.DB_PORT);
        this._dbName = dbName ? dbName : process.env.DB_NAME;
        this._userName = userName ? userName : process.env.DB_USER;
        this._password = password ? password : process.env.DB_PASSWORD;
    }

    get hostName(): string {
        return this._hostName;
    }

    set hostName(value: string) {
        if (value !== this._hostName) {
            this._hostName = value;
        }
    }

    get port(): number {
        return this._port;
    }

    set port(value: number) {
        if (value !== this._port) {
            this._port = value;
        }
    }

    get dbName(): string {
        return this._dbName;
    }

    set dbName(value: string) {
        if (value !== this._dbName) {
            this._dbName = value;
        }
    }

    get userName(): string {
        return this._userName;
    }

    set userName(value: string) {
        if (value !== this._userName) {
            this._userName = value;
        }
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (value !== this._password) {
            this._password = value;
        }
    }
}
