import { ImageObject } from "./ImageObject";

export interface ButtonProps {
    image?: ImageObject;
    id?: number;
    onClick: Function;
    name?: string;
}