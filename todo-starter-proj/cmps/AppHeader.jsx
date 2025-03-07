// import { userService } from '../services/user.service.js'
// import { UserMsg } from "./UserMsg.jsx"
// import { LoginSignup } from './LoginSignup.jsx'
// import { showErrorMsg } from '../services/event-bus.service.js'
// import { logout } from "../store/actions/user.actions.js";

// const { useState } = React
// const { Link, NavLink } = ReactRouterDOM
// const { useNavigate } = ReactRouter


// export function AppHeader() {
//     const navigate = useNavigate()
//     const [user, setUser] = useState(userService.getLoggedinUser())
    
//     function onLogout() {
//         logout()
//             .then(() => {
//                 showSuccessMsg('Logout successfully')
//             })
//             .catch((err) => {
//                 showErrorMsg('OOPs try again')
//             })
//     }

//     function onSetUser(user) {
//         setUser(user)
//         navigate('/')
//     }
//     return (
//         <header className="app-header full main-layout">
//             <section className="header-container">
//                 <h1>React Todo App</h1>
//                 {user ? (
//                     < section >

//                         <Link to={`/user/${user._id}`}>Hello {user.fullname} | Balance: ${user.balance}</Link>
//                         <button onClick={onLogout}>Logout</button>
//                     </ section >
//                 ) : (
//                     <section>
//                         <LoginSignup onSetUser={onSetUser} />
//                     </section>
//                 )}
//                 <nav className="app-nav">
//                     <NavLink to="/" >Home</NavLink>
//                     <NavLink to="/about" >About</NavLink>
//                     <NavLink to="/todo" >Todos</NavLink>
//                     <NavLink to="/dashboard" >Dashboard</NavLink>
//                 </nav>
//             </section>
//             <UserMsg />
//         </header>
//     )
// }



import { userService } from '../services/user.service.js';
import { UserMsg } from "./UserMsg.jsx";
import { LoginSignup } from './LoginSignup.jsx';
import { showErrorMsg } from '../services/event-bus.service.js';
import { setUser, logout } from '../store/actions/user.actions.js';

const { Link, NavLink } = ReactRouterDOM;
const { useNavigate } = ReactRouter;
const { useDispatch, useSelector } = ReactRedux;
export function AppHeader() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(storeState => storeState.userModule.loggedInUser);

 
    async function onLogout() {
        try {
            await dispatch(logout())
            showSuccessMsg('Logout successfully')
        } catch (err) {
            showErrorMsg('OOPs try again')
        }
    }


    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                {user ? (
                    <section>
                        <Link to={`/user/${user._id}`}>Hello {user.fullname} | Balance: ${user.balance}</Link>
                        <button onClick={onLogout}>Logout</button>
                    </section>
                ) : (
                    <section>
                        <LoginSignup onSetUser={(user) => dispatch(setUser(user))} />
                    </section>
                )}
                <nav className="app-nav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/todo">Todos</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </nav>
            </section>
            <UserMsg />
        </header>
    );
}


