import DataClientBase from "../core/data/dataclientbase";

export abstract class Repository {
    constructor(protected db: DataClientBase) {}
}
