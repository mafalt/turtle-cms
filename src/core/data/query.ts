import { SqlParameter } from "./sqlparameter";

export class Query {
    private _sqlText: string;
    private _parameters: SqlParameter[];

    constructor(sqlText: string, parameters?: SqlParameter[]) {
        this._sqlText = sqlText;
        this._parameters = parameters;
    }

    get sqlText(): string {
        return this._sqlText;
    }

    get parameters(): SqlParameter[] {
        return this._parameters;
    }

    set sqlText(value: string) {
        if (value !== this._sqlText) {
            this._sqlText = value;
        }
    }

    set parameters(value: SqlParameter[]) {
        if (value !== this._parameters) {
            this._parameters = value;
        }
    }
}