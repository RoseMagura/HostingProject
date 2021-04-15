import { ImageObject } from "./ImageObject";
import { User } from "./User";

export interface ButtonProps {
    item?: ImageObject | User;
    id?: number;
    onClick: Function;
    name?: string;
}