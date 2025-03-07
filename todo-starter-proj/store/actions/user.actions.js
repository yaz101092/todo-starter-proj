

// import { userService } from "../../services/user.service.js"
// import { store } from "../store.js"
// import { INCREASE_BALANCE, SET_USER } from "../reducers/user.Reducer.js";


// export function login(credentials) {
//     return userService.login(credentials)
//         .then(user => {
//             store.dispatch({ type: SET_USER, user })
//         })
//         .catch(err => {
//             console.log('user actions -> Cannot login', err)
//             throw err
//         })
// }

// export function signup(credentials) {
//     return userService.signup(credentials)
//         .then(user => {
//             store.dispatch({ type: SET_USER, user })
//         })
//         .catch(err => {
//             console.log('user actions -> Cannot signup', err)
//             throw err
//         })
// }

// // export function logout() {
// //     return userService.logout()
// //         .then(() => {
// //             store.dispatch({ type: SET_USER, user: null })
// //         })
// //         .catch((err) => {
// //             console.log('user actions -> Cannot logout', err)
// //             throw err
// //         })
// // }
// export function logout() {
//     return userService.logout()
//         .then(() => {
//             store.dispatch({ type: SET_USER, user: null });
//             return Promise.resolve(); // ✅ מחזיר הבטחה מוצלחת כדי למנוע הפעלה לא נכונה של catch
//         })
//         .catch((err) => {
//             console.log('user actions -> Cannot logout', err);
//             return Promise.reject(err); // ✅ מחזיר שגיאה אמיתית ולא מפעיל catch אם אין צורך
//         });
//  }           
// // export function logout() {
// //     return {
// //         type: LOGOUT_USER
// //     };
// // }

// export function setUser(user) {
//     store.dispatch({ type: SET_USER, user });
// }

// // export function increaseBalance(amount, txt) {
// //     const { loggedInUser } = store.getState().userModule;
// //     if (!loggedInUser) return;

// //     const updatedUser = {
// //         ...loggedInUser,
// //         balance: (loggedInUser.balance || 10000) + amount,
// //         activities: [...(loggedInUser.activities || []), { txt, at: Date.now() }]
// //     };

// //     dispatch({ type: INCREASE_BALANCE, user: updatedUser })

// //     // ✅ לאחר מכן מעדכנים את ה-SessionStorage (לא ב-Redux)
// //     sessionStorage.setItem('user', JSON.stringify(updatedUser));
// // }



// export function increaseBalance(amount, txt) {
//     return {
//         type: INCREASE_BALANCE,
//         payload: {
//             amount,
//             txt
//         }
//     };
// }

import { store } from "../store.js";
import { userService } from "../../services/user.service.js";
import { showSuccessMsg, showErrorMsg } from "../../services/event-bus.service.js";

export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const INCREASE_BALANCE = "INCREASE_BALANCE";

export function setUser(user) {
    store.dispatch({ type: SET_USER, user });
}

// export function login(credentials) {
//     return userService.login(credentials)
//         .then(user => {
//             if (!user) throw new Error("Invalid login")
//             store.dispatch({ type: SET_USER, user });
//             showSuccessMsg("Login successful"); // ✅ רק אם ההתחברות מצליחה
//             return user;
//         })
//         .catch(err => {
//             console.error("Login error:", err)
//             showErrorMsg("Login failed. Please try again.");
//             return Promise.reject(err);
//         });
// }
export function login(credentials) {
    return userService.login(credentials)
        .then(user => {
            if (!user) {
                console.warn("Login failed: User not found."); // ✅ מציג אזהרה במקום להפעיל catch
                showErrorMsg("Invalid login credentials.");
                return Promise.reject("Invalid login");
            }
            store.dispatch({ type: SET_USER, user });
            showSuccessMsg("Login successful");
            return user;
        })
        .catch(err => {
            if (err !== "Invalid login") { // ✅ מונע הצגת הודעת שגיאה במקרה של סתם ניסיון התחברות כושל
                console.error("Unexpected login error:", err);
                showErrorMsg("Login failed. Please check your internet connection and try again.");
            }
            return Promise.reject(err);
        });
}




export function logout() {
    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, user: null });
            showSuccessMsg("Logout successful"); // ✅ רק אם ההתנתקות מצליחה
            return Promise.resolve();
        })
        .catch((err) => {
            showErrorMsg("Logout failed. Please try again.");
            console.log('user actions -> Cannot logout', err);
            return Promise.reject(err); 
        });
}

export function increaseBalance(amount, txt) {
    return {
        type: INCREASE_BALANCE,
        payload: {
            amount: Number(amount) || 0,
            txt
        }
    };
}


