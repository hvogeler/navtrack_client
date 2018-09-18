import {RoleTo} from "./RoleTo";

export class UserTo {
    public id: number;
    public username: string;
    public password: string;
    public email: string;
    public description: string;
    public enabled: boolean;
    public roles: [RoleTo];
}
