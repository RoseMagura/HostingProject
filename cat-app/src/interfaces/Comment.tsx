import { User } from "./User";

export interface Comment {
    id: number;
    text: string;
    imageId: number;
    userId: number;
    createdAt?: string;
    updatedAt?: string;
    key?: string;
    user?: User;
    func: Function;
}
