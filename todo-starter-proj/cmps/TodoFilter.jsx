// const { useState, useEffect } = React

// export function TodoFilter({ filterBy, onSetFilterBy }) {

//     const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})

//     useEffect(() => {
//         // Notify parent
//         onSetFilterBy(filterByToEdit)
//     }, [filterByToEdit])

//     function handleChange({ target }) {
//         const field = target.name
//         let value = target.value

//         switch (target.type) {
//             case 'number':
//             case 'range':
//                 value = +value || ''
//                 break

//             case 'checkbox':
//                 value = target.checked
//                 break

//             default: break
//         }

//         const filteredTodos = todos.filter((todo) => {
//             if (filterBy.status === "all") return true;
//             if (filterBy.status === "active") return !todo.isDone;
//             if (filterBy.status === "done") return todo.isDone;
//         })

//         setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
//     }

//     // Optional support for LAZY Filtering with a button
//     function onSubmitFilter(ev) {
//         ev.preventDefault()
//         onSetFilterBy(filterByToEdit)
//     }

//     const { txt, importance, isDone } = filterByToEdit
//     return (
//         <section className="todo-filter">
//             <h2>Filter Todos</h2>
//             <form onSubmit={onSubmitFilter}>
//                 <input value={txt} onChange={handleChange}
//                     type="search" placeholder="By Txt" id="txt" name="txt"
//                 />
//                 <label htmlFor="importance">Importance: </label>
//                 <input value={importance} onChange={handleChange}
//                     type="number" placeholder="By Importance" id="importance" name="importance"
//                 />


//                 <label htmlFor="status">Status:</label>
//                 <select name="isDone" value={isDone === null ? 'all' : isDone ? 'done' : 'active'} onChange={handleChange}>
//                     <option value="all">All</option>
//                     <option value="active">Active</option>
//                     <option value="done">Done</option>
//                 </select>

//                 <button hidden>Set Filter</button>
//             </form>
//         </section>
//     )
// }

const { useState, useEffect } = React

export function TodoFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        // Notify parent when filter changes
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            case 'select-one':
                if (value === 'all') value = null
                else if (value === 'active') value = false
                else if (value === 'done') value = true
                break

            default:
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, importance, isDone } = filterByToEdit

    return (
        <section className="todo-filter">
            <h2>Filter Todos</h2>
            <form onSubmit={onSubmitFilter}>
                <input
                    value={txt || ''}
                    onChange={handleChange}
                    type="search"
                    placeholder="By Txt"
                    id="txt"
                    name="txt"
                />
                <label htmlFor="importance">Importance: </label>
                <input
                    value={importance || ''}
                    onChange={handleChange}
                    type="number"
                    placeholder="By Importance"
                    id="importance"
                    name="importance"
                />

                <label htmlFor="status">Status:</label>
                <select
                    name="isDone"
                    value={isDone === null ? 'all' : isDone === true ? 'done' : 'active'}
                    onChange={handleChange}
                >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="done">Done</option>
                </select>

                <button hidden>Set Filter</button>
            </form>
        </section>
    )
}
