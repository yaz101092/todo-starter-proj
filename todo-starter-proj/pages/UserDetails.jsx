import { SET_USER } from "../store/actions/user.actions.js";
import { Home } from "../pages/Home.jsx";

const { useDispatch, useSelector } =  ReactRedux
const { useState } =  React 

export function UserDetails() {
  const user = useSelector(state => state.userModule.loggedInUser);
  const dispatch = useDispatch();

  // const [fullname, setFullname] = useState(user && user.fullname ? user.fullname : "");
  // const [prefs, setPrefs] = useState(user && user.prefs ? user.prefs : { color: 'white', bgColor: 'black' });
  const [fullname, setFullname] = useState(user && user.fullname ? user.fullname : "");
  const [prefs, setPrefs] = useState(user && user.prefs ? user.prefs : { color: 'var(--clr2bg-light)', bgColor: 'var(--clr1)' });


  function handleSave() {
      dispatch({ type: "SET_USER", user: { ...user, fullname, prefs } });
  }

  return (
      <section>
          <h1>User Details</h1>

          {user ? (
              <div>
                  <label>Fullname:
                      <input type="text" value={fullname} onChange={e => setFullname(e.target.value)} />
                  </label>
                  <label>Text Color:
                      <input type="color" value={prefs.color} onChange={e => setPrefs({ ...prefs, color: e.target.value })} />
                  </label>
                  <label>Background Color:
                      <input type="color" value={prefs.bgColor} onChange={e => setPrefs({ ...prefs, bgColor: e.target.value })} />
                  </label>
                  <button onClick={handleSave}>Save Changes</button>

                  <h3>Activity Log</h3>
                  <ul>
                      {(user && user.activities) ? user.activities.map((activity, idx) => (
                          <li key={idx}>{new Date(activity.at).toLocaleTimeString()}: {activity.txt}</li>
                      )) : <p>No activities found.</p>}
                  </ul>
              </div>
          ) : (
              <Home /> 
          )}
      </section>
  );
}
