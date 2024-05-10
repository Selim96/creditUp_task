import  {IState, IEmail} from "../interfaces/interfaces"

const getLogged = (state: IState) => state.isLogedIn;
const getAllEmails = (state: IState) => state.allEmails;
const getUser = (state: IState) => state.user;
const getLoading = (state: IState) => state.loading;
const getError = (state: IState) => state.error;

const allSelectors = {
    getLogged,
    getAllEmails,
    getUser,
    getLoading,
    getError
}

export default allSelectors