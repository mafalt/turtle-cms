export class SqlParameter {
    private _name: string;
    private _value: any;
    private _output: boolean;
    private _type: any;

    constructor(name: string, value: any, type?: any, output: boolean = false) {
        this._name = name;
        this._value = value;
        this._output = output;
        this._type = type;
    }

    get name(): string {
        return this._name;
    }

    set name(val: string) {
        if (val !== this._name) {
            this._name = val;
        }
    }

    get value(): any {
        return this._value;
    }

    set value(val: any) {
        if (val !== this._value) {
            this._value = val;
        }
    }

    get isOutput(): boolean {
        return this._output;
    }

    set isOutput(val: boolean) {
        if (val !== this._output) {
            this._output = val;
        }
    }

    get type(): any {
        return this._type;
    }

    set type(val: any) {
        if (val !== this._type) {
            this._type = val;
        }
    }
}
