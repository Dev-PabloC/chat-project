//User entity
export interface User {
    username: string;
    email: string;
    password: string;
}

export type updateUser = Partial<User>