import { ServerResponse } from "http";

export function redirect(res: ServerResponse, location: string) {
    res.writeHead(301, {
        "Location": location
    });
    res.end();
};
