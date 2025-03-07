import { todoService } from "../../services/todo.service.js";
import { ADD_TODO, REMOVE_TODO, SET_TODO, SET_IS_LOADING, UNDO_TODOS, UPDATE_TODO } from "../reducers/todo.Reducer.js";
import { store } from "../store.js";

export function loadTodos() {
    const filterBy = store.getState().todoModule.filterBy
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({ type: SET_TODO, todos })
        })
        .catch(err => {
            console.log('todo action -> Cannot load todos', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}


export function removeTodoOptimistic(todoId) {
    store.dispatch({ type: REMOVE_TODO, todoId })
    return todoService.remove(todoId)
        .catch(err => {
            store.dispatch({ type: UNDO_TODOS })
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
        })
        .catch(err => {
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}


export function saveTodo(todo) {
    const type = todo.id ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then((savedTodo) => {
            store.dispatch({ type, todo: savedTodo })
            return savedTodo
        })
        .catch(err => {
            console.log('todo action -> Cannot save todo', err)
            throw err
        })
}


export function updateTodoColor(todo, color) {
    const updatedTodo = { ...todo, color };

    todoService.save(updatedTodo)
        .then((savedTodo) => {
            store.dispatch({ type: UPDATE_TODO, todo: savedTodo });
        })
        .catch(err => {
            console.error('Cannot update todo color', err);
        });
}
