export interface ImageProps {
    loginStatus: boolean;
    id: number;
    title: string;
    userId?: number;
    url: string;
    createdAt?: string;
    updatedAt?: string;
    delete: Function;
}