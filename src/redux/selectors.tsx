import  {IState, IEmail} from "../interfaces/interfaces"

const getLogged = (state: IState) => state.isLogedIn;
const getAllEmails = (state: IState) => state.allEmails;
const getUser = (state: IState) => state.user;
const getLoading = (state: IState) => state.loading;
const getError = (state: IState) => state.error;
const getIsModalOpen = (state: IState) => state.isModalOpen;
const getSendedData = (state:IState) => state.sendedData;

const allSelectors = {
    getLogged,
    getAllEmails,
    getUser,
    getLoading,
    getError,
    getIsModalOpen,
    getSendedData
}

export default allSelectors