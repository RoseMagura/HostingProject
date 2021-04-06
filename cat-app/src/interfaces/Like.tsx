import { User } from "./User";

export interface Like {
    id: number;
    imageId: number;
    userId: number;
    user?: User;
}
