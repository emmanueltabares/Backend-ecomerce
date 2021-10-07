export interface UserI {
    id: string;
    username: string;
    password: string;
    isValidPassword: (password: string) => Promise<boolean>;
  }

export interface User {
    _id?: string;
  }

export type Photos = {
    value: string;
  };
  
export type Emails = {
    value: string;
  };
  
export interface User extends Express.User {
    contador?: number;
    displayName?: string;
    photos?: Photos[];
    emails?: Emails[];
  }