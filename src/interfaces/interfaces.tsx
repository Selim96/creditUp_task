export interface IEmail {
    id: number,
    sender: number,
    recipient:	string,
    subject: string,
    message: string,
}

export interface IUser {
    id: number,
    username: string,
    email: string,
    password: string
}

export interface ISendData {
    sender: number,
    recipient: string,
    subject: string,
    message: string
}

export interface IState {
    isLogedIn: boolean,
    user: IUser,
    emailCount:number,
    allEmails: IEmail[],
    loading: boolean,
    error: any,
    isModalOpen: boolean,
    sendedData: null | {}
};