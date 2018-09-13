import {RoleDo} from "./RoleDo";

export class UserDo {
    public id: number;
    public username: string;
    public password: string;
    public email: string;
    public description: string;
    public enabled: boolean;
    public roles: [RoleDo];
}
