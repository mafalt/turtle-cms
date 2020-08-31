import {ValidatedUser} from '../models/usermodels';

export interface UserRepository {
    validateLogin(username: string, password: string): Promise<ValidatedUser>;
}
