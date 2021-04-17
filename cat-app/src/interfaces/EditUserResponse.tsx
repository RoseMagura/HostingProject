import { Response } from 'express';

export interface EditUserResponse {
    changed: boolean;
    newUsername: string;
    newPassword: string;
    newFirstName: string;
    newLastName: string;
    newAdminStatus: boolean;
    res: Response;
}