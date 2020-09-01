export class SqlParameter {
    private _name: string;
    private _value: any;
    private _output: boolean;

    constructor(name: string, value: any, output: boolean = false) {
        this._name = name;
        this._value = value;
        this._output = output;
    }

    get name(): string {
        return this._name;
    }

    get value(): any {
        return this._value;
    }

    get isOutput(): boolean {
        return this._output;
    }
}
