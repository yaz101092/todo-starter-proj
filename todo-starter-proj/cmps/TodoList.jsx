
import { TodoPreview } from "./TodoPreview.jsx";
const { useState } = React;
const { Link } = ReactRouterDOM;

export function TodoList({ todos, onRemoveTodo, onToggleTodo }) {
    const [todoColors, setTodoColors] = useState(() => {
        return JSON.parse(localStorage.getItem('todoColors')) || {};
    });

    function handleSetColor(todoId, color) {
        setTodoColors(prevColors => {
            const updatedColors = { ...prevColors, [todoId]: color };
            localStorage.setItem('todoColors', JSON.stringify(updatedColors));
            return updatedColors;
        });
    }

    return (
        <React.Fragment>
            <ul className="todo-list">
                {todos.map(todo => (
                    <li key={todo._id} style={{ backgroundColor: todoColors[todo._id] || "white" }}>
                        <TodoPreview todo={todo} onToggleTodo={() => onToggleTodo(todo)} />
                        <section>
                            <button onClick={() => onRemoveTodo(todo._id)}>Remove</button>
                            <button><Link to={`/todo/${todo._id}`}>Details</Link></button>
                            <button><Link to={`/todo/edit/${todo._id}`}>Edit</Link></button>
                            
                            <select onChange={(e) => handleSetColor(todo._id, e.target.value)} value={todoColors[todo._id] || ""}>
                                <option value="">Select Color</option>
                                <option value="red">Red</option>
                                <option value="green">Green</option>
                                <option value="yellow">Yellow</option>
                                <option value="purple">Purple</option>
                                <option value="rgb(201, 175, 148)">smoked latte</option>
                                <option value="rgb(140, 247, 216)">lightblue</option>
                                <option value="rgb(236, 179, 178)">pink latte</option>
                                <option value="rgb(236, 235, 189)">spring green</option>
                                <option value="rgb(211, 203, 200)">ancient marbel</option>
                                <option value="rgb(224, 181, 246)">light purple</option>
                                <option value="rgb(102, 165, 134)">beauty green</option>
                                <option value="rgb(219, 112, 147)">PaleVioletRed</option>
                                <option value="rgb(255, 127, 80)">coral</option>
                                <option value="rgb(0, 191, 255)">DeepSkyBlue</option>
                            </select>
                        </section>
                    </li>
                ))}
            </ul>
        </React.Fragment>
    );
}

