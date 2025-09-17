export type UserType = {
    id: number;
    username: string;
    accounts: AccountType[];
    email: string;
    role: string;
}

export type AccountType = {
    id :number;
    userId:number;
    mrivalsAccount: string;
    statsRawJson: string;
}

export const emptyAccount = {
    id: 0,
    userId: 0,
    mrivalsAccount: "",
    statsRawJson: ''
}