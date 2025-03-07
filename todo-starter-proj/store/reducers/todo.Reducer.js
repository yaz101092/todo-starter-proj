import { todoService } from "../../services/todo.service.js"

//* Todos
export const SET_TODO = 'SET_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    todos: [],
    lastTodo: [],
    filterBy: todoService.getDefaultFilter(),
    isLoading: false,
    userObject: {},
}

export function todoReducer(state = initialState, cmd = {}) {

    switch (cmd.type) {
        case SET_TODO:
            return {
                ...state,
                todos: cmd.todos
            }
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== cmd.todoId),
                lastTodo: [...state.todos]
            }
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, cmd.todo]
            }
        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => todo._id === cmd.todo._id ? cmd.todo : todo)
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.filterBy }
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            } 
        default:
            return state
        }
}
        //* Shopping cart
        // case TOGGLE_CART_IS_SHOWN:
        //     return { ...state, isCartShown: !state.isCartShown }

        // case ADD_CAR_TO_CART:
        //     return {
        //         ...state,
        //         shoppingCart: [...state.shoppingCart, cmd.car]
        //     }

        // case REMOVE_CAR_FROM_CART:
        //     const shoppingCart = state.shoppingCart.filter(car => car.id !== cmd.carId)
        //     return { ...state, shoppingCart }


        // case CLEAR_CART:
        //     return { ...state, shoppingCart: [] }
    
// export const UNDO_TODO = 'UNDO_TODO'
// //* Shopping cart
// export const TOGGLE_CART_IS_SHOWN = 'TOGGLE_CART_IS_SHOWN'
// export const ADD_TODO_TO_CART = 'ADD_TODO_TO_CART'
// export const REMOVE_TODO_FROM_CART = 'REMOVE_TODO_FROM_CART'
// export const CLEAR_CART = 'CLEAR_CART'



