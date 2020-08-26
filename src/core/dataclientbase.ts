export default abstract class DataClientBase {
    protected abstract queryImpl(query: any): Promise<void | any>;

    public async query(query: any): Promise<void | any> {
        try {
            await this.queryImpl(query);
        } catch (err) {
            throw err;
        }
    }
}
