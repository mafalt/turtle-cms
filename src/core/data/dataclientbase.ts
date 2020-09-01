import { Query } from "./query";

export default abstract class DataClientBase {
    protected abstract queryImpl(query: any): Promise<void | any>;

    public async query(query: Query): Promise<void | any> {
        try {
            await this.queryImpl(query);
        } catch (err) {
            throw err;
        }
    }
}
