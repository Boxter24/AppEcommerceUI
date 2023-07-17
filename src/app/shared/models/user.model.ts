export interface User {
    id: number;
    fullname: string;
    email: string;
    password: string,
}

export type CreateUser = Omit<User, 'id'>;