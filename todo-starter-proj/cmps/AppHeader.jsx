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
import { UserDetails } from "../pages/UserDetails.jsx";


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


    const color = user && user.prefs ? user.prefs.color : 'var(--clr2bg-light)'   
    const bgColor = user && user.prefs ? user.prefs.bgColor : 'var(--clr1)' 
    
    return (
        <header className="app-header full main-layout"style={{ backgroundColor: bgColor, color: color }}>
            <section className="header-container">
                <h1>React Todo App</h1>
                {user ? (
                    <section>
                            Hello  
                            <Link to={`/user/${user._id}`}>  {user.fullname} </Link>
                            | Balance: ${user.balance}
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


// import { useSelector, useDispatch } from "react-redux";
// import { useState } from "react";
// import { setUser } from "../store/actions/user.actions.js";

// export function UserDetails() {
//     const user = useSelector(state => state.userModule.loggedInUser);
//     const dispatch = useDispatch();

//     const [fullname, setFullname] = useState(user && user.fullname ? user.fullname : "");
//     const [prefs, setPrefs] = useState(user && user.prefs ? user.prefs : { color: '#000000', bgColor: '#ffffff' });

//     function handleSave() {
//         dispatch({ type: "SET_USER", user: { ...user, fullname, prefs } });
//     }

//     return (
//         <section style={{ color: prefs.color, backgroundColor: prefs.bgColor }}>
//             <h1>User Details</h1>

//             {user ? (
//                 <div>
//                     <label>Fullname:
//                         <input type="text" value={fullname} onChange={e => setFullname(e.target.value)} />
//                     </label>
//                     <label>Text Color:
//                         <input type="color" value={prefs.color} onChange={e => setPrefs({ ...prefs, color: e.target.value })} />
//                     </label>
//                     <label>Background Color:
//                         <input type="color" value={prefs.bgColor} onChange={e => setPrefs({ ...prefs, bgColor: e.target.value })} />
//                     </label>
//                     <button onClick={handleSave}>Save Changes</button>

//                     <h3>Activity Log</h3>
//                     <ul>
//                         {(user && user.activities) ? user.activities.map((activity, idx) => (
//                             <li key={idx}>{new Date(activity.at).toLocaleTimeString()}: {activity.txt}</li>
//                         )) : <p>No activities found.</p>}
//                     </ul>
//                 </div>
//             ) : (
//                 <p>Please log in to see your details.</p>
//             )}
//         </section>
//     );
// }
