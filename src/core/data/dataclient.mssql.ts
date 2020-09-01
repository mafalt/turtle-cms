import * as mssql from 'mssql';

import DataClientBase from "./dataclientbase";
import { Query } from "./query";
import { DatabaseConfig } from '../dbconfig';

export class MSSQLDataClient extends DataClientBase {

    private client: mssql.ConnectionPool;

    constructor(dbConfig?: DatabaseConfig) {
        super();

        this.client = new mssql.ConnectionPool({
            server: dbConfig.hostName,
            port: dbConfig.port,
            database: dbConfig.dbName,
            user: dbConfig.userName,
            password: dbConfig.password
        });
    }

    protected async queryImpl(query: Query): Promise<any> {
        try {
            await this.connect();
            
            if (query.parameters && query.parameters.length > 0) {
                var params: {[key: string]: any} = {};
                const ps = new mssql.PreparedStatement(this.client);
                query.parameters.forEach(p => {
                    if (p.isOutput) {
                        ps.output(p.name, p.type);
                    } else {
                        ps.input(p.name, p.type);
                        params[p.name] = p.value;
                    }
                });

                try {
                    await ps.prepare(query.sqlText);
                    return await ps.execute(params);
                } catch (err) {
                    throw err;
                } finally {
                    try {
                        await ps.unprepare();
                    } catch (err) {
                        throw err;
                    }
                }
            } else {
                const request = new mssql.Request(this.client);
                return await request.query(query.sqlText);
            }
        } catch (err) {
            throw err;
        } finally {
            this.client.close();
        }
    }

    private async connect() {
        if (!this.client.connected) {
            try {
                await this.client.connect();
            } catch (err) {
                throw err;
            }
        }
    }
}
