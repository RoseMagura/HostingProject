import { Response } from 'express';

export interface EditImageResponse {
    changed: boolean;
    newTitle: string;
    newUrl: string;
    res: Response;
}