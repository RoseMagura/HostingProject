import { ImageObject } from "./ImageObject";

export interface ImageProps {
    loginStatus: boolean;
    id: number;
    title: string;
    userId?: number;
    url: string;
    createdAt?: any;
    updatedAt?: any;
    delete: Function;
}