

// export function TodoPreview({ todo, onToggleTodo }) {
//     const dispatch = useDispatch();

//     function handleToggle() {
//         onToggleTodo(todo);
//         if (!todo.isDone) {  // רק אם המשימה מסומנת כהושלמה
//             dispatch({
//                 type: INCREASE_BALANCE,
//                 user: {
//                     ...user, // כאן תוכל לקחת את הנתונים מה-state
//                     balance: (user.balance || 10000) + 10,
//                     activities: [...(user.activities || []), { txt: "Completed a Todo", at: Date.now() }]
//                 }
//             });
            
//         }
//     }

//     return (
//         <article className="todo-preview" style={{ backgroundColor: todo.color }}>
//             <h2 className={(todo.isDone)? 'done' : ''} onClick={handleToggle}>
//                 Todo: {todo.txt}
//             </h2>
//             <h4>Todo Importance: {todo.importance}</h4>
//             <img src={`../assets/img/${'todo'}.png`} alt="" />
//         </article>
//     )
// }
const { useDispatch, useSelector } =  ReactRedux
import { INCREASE_BALANCE } from '../store/reducers/user.Reducer.js'
import { increaseBalance } from "../store/actions/user.actions.js";

export function TodoPreview({ todo, onToggleTodo }) {
    const dispatch = useDispatch();
    
    // ✅ קבלת המשתמש מה-Redux
    const user = useSelector(storeState => storeState.userModule.loggedInUser);

    function handleToggle() {
        onToggleTodo(todo);
        if (!todo.isDone && user) { // ✅ בדיקה אם המשתמש קיים
            dispatch(increaseBalance(10, "Completed a Todo"))
        }
    }

    return (
        <article className="todo-preview" style={{ backgroundColor: todo.color }}>
            <h2 className={(todo.isDone) ? 'done' : ''} onClick={handleToggle}>
                Todo: {todo.txt}
            </h2>
            <h4>Todo Importance: {todo.importance}</h4>
            <p>Balance: ${user ? user.balance : 10000}</p> {/* ✅ בדיקה שהמשתמש קיים */}
        </article>
    );
}










