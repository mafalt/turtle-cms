import { Role } from "./rolemodels";

export class ValidatedUser {
    id: number;
    username: string;
    fullName: string;
    isAdmin: boolean;
    isMember: boolean;
    roles: Role[];

    constructor(id: number, username: string, fullName: string, isAdmin?: boolean, isMember?: boolean, roles?: Role[]) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.isAdmin = isAdmin !== undefined && isAdmin !== null ? isAdmin : false;
        this.isMember = isMember !== undefined && isMember !== null ? isMember : false;
        this.roles = roles;
    }
}
