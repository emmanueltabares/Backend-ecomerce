export interface UserI {
    id: string;
    username: string;
    password: string;
    isValidPassword: (password: string) => Promise<boolean>;
  }

export interface User {
    _id?: string;
  }