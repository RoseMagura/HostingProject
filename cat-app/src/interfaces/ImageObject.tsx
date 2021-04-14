import { Like } from "./Like";

export interface ImageObject {
    id: number;
    title: string;
    url: string;
    likes?: Like[];
    sendRes?: Function;
}