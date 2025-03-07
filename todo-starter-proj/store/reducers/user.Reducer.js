export const SET_USER = 'SET_USER'
export const INCREASE_BALANCE = "INCREASE_BALANCE";

const initialBalance = 10000;
const initialState = {
    loggedInUser: null
};

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                loggedInUser: action.user ? { 
                    ...action.user,
                    balance: Number(action.user.balance) || initialBalance 
                } : null
            };

        case INCREASE_BALANCE:
            if (!state.loggedInUser) return state;

            return {
                ...state,
                loggedInUser: {
                    ...state.loggedInUser,
                    balance: Number(state.loggedInUser.balance || initialBalance) + Number(action.payload.amount || 0),
                    activities: [
                        ...(state.loggedInUser.activities || []),
                        { txt: action.payload.txt || "Balance Updated", at: Date.now() }
                    ]
                }
            };

        default:
            return state;
    }
}





