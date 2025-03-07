// import { TodoFilter } from "../cmps/TodoFilter.jsx"
// import { TodoList } from "../cmps/TodoList.jsx"
// import { DataTable } from "../cmps/data-table/DataTable.jsx"
// import { todoService } from "../services/todo.service.js"
// import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
// import { SET_FILTER_BY, REMOVE_TODO, UPDATE_TODO } from '../store/reducers/todo.Reducer.js'
// import { updateTodoColor, loadTodos, saveTodo } from "../store/actions/todo.actions.js"
// import {increaseBalance  } from "../store/actions/user.actions.js";

// const { useEffect } = React
// const { useSelector, useDispatch } = ReactRedux
// const { Link, useSearchParams } = ReactRouterDOM

// export function TodoIndex() {

//     const todos = useSelector(storeState => storeState.todoModule.todos)
//     const filterBy = useSelector(storeState => storeState.todoModule.filterBy)
//     const isLoading = useSelector(storeState => storeState.todoModule.isLoading)
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(loadTodos())
//         .catch(() => showErrorMsg('Cannot load todos'))
//     }, [filterBy,dispatch])

    

//     function onSetFilter(filterBy) {
//         dispatch({ type: SET_FILTER_BY, filterBy })
//     }

//     function onRemoveTodo(todoId) {
//         const isConfirmed = confirm("Are you sure you want to remove?"); 
//         if (!isConfirmed) return;
//         dispatch({ type: REMOVE_TODO, todoId })
//     }
    
//     // function onToggleTodo(todo) {
//     //     const todoToSave = { ...todo, isDone: !todo.isDone };
//     //     todoService.save(todoToSave)
//     //         .then((savedTodo) => {
//     //             dispatch({ type: UPDATE_TODO, todo: savedTodo }); 
//     //             showSuccessMsg(`Todo is now ${(savedTodo.isDone) ? 'done' : 'active'}!`);
//     //         })
//     //         .catch((err) => {
//     //             console.error('Cannot toggle todo', err);
//     //             showErrorMsg('Cannot toggle todo');
//     //         });
//     // }

//     function onToggleTodo(todo) {
//         const todoToSave = { ...todo, isDone: !todo.isDone }
    
//         todoService.save(todoToSave)
//             .then((savedTodo) => {
//                 dispatch({ type: UPDATE_TODO, todo: savedTodo })
    
//                 if (savedTodo.isDone) {
//                     dispatch(increaseBalance(10, "Completed a todo")) 
//                     showSuccessMsg("Todo completed! Balance increased.")
//                 }
//             })
//             .catch(err => {
//                 console.error("Cannot toggle todo", err)
//                 showErrorMsg("Cannot toggle todo")
//             });
//     }
    
//     function onSetTodoStyle(todo, color) {
//         dispatch(updateTodoColor(todo, color));
//     }
    
//     if (!todos) return <div>Loading...</div>
//     return (
//         <section className="todo-index">
//             <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilter} />
//             <div>
//                 <Link to="/todo/edit" className="btn" >Add Todo</Link>
//             </div>
//             <h2>Todos List</h2>
//             <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} onSetTodoStyle={onSetTodoStyle} />
//             <hr />
//             <h2>Todos Table</h2>
//             <div style={{ width: '60%', margin: 'auto' }}>
//                 <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
//             </div>
//         </section>
//     )
// }

import { TodoFilter } from "../cmps/TodoFilter.jsx";
import { TodoList } from "../cmps/TodoList.jsx";
import { DataTable } from "../cmps/data-table/DataTable.jsx";
import { todoService } from "../services/todo.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { SET_FILTER_BY, REMOVE_TODO, UPDATE_TODO } from "../store/reducers/todo.Reducer.js";
import { updateTodoColor, saveTodo } from "../store/actions/todo.actions.js";
import { increaseBalance } from "../store/actions/user.actions.js";

const { useEffect } = React;
const { useSelector, useDispatch } = ReactRedux;
const { Link, useSearchParams } = ReactRouterDOM;

export function TodoIndex() {
    const todos = useSelector(storeState => storeState.todoModule.todos);
    const filterBy = useSelector(storeState => storeState.todoModule.filterBy);
    const isLoading = useSelector(storeState => storeState.todoModule.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        todoService.query(filterBy)
            .then(todos => dispatch({ type: "SET_TODO", todos }))
            .catch(() => showErrorMsg("Cannot load todos"));
    }, [filterBy, dispatch]);

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy });
    }

    function onRemoveTodo(todoId) {
        const isConfirmed = confirm("Are you sure you want to remove?");
        if (!isConfirmed) return;
        todoService.remove(todoId)
            .then(() => dispatch({ type: REMOVE_TODO, todoId }))
            .catch(err => {
                console.error("Cannot remove todo", err);
                showErrorMsg("Cannot remove todo");
            });
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone };
        todoService.save(todoToSave)
            .then(savedTodo => {
                dispatch({ type: UPDATE_TODO, todo: savedTodo });
                if (savedTodo.isDone) {
                    increaseBalance(10, "Completed a todo");
                    showSuccessMsg("Todo completed! Balance increased.");
                }
            })
            .catch(err => {
                console.error("Cannot toggle todo", err);
                showErrorMsg("Cannot toggle todo");
            });
    }

    function onSetTodoStyle(todo, color) {
        updateTodoColor(todo, color);
    }

    if (!todos) return <div>Loading...</div>;
    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilter} />
            <div>
                <Link to="/todo/edit" className="btn">Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} onSetTodoStyle={onSetTodoStyle} />
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: "60%", margin: "auto" }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div>
        </section>
    );
}
