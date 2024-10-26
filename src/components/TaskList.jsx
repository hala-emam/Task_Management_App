
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../features/taskSlice';
import EditTask from './EditTask';

function TaskList() {
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();
    console.log(tasks)
    // Filter state
    const [stateFilter, setStateFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState(''); 
    
    // Delete function
    const handleDelete = (id) => {
        dispatch(deleteTask(id));
    };

    // Filter tasks based on state, priority, and search term
    const filteredTasks = tasks.filter(task => {
        const stateMatch = stateFilter === 'all' || task.status === stateFilter;
        const priorityMatch = priorityFilter === 'all' || task.priority === priorityFilter;
        const searchMatch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        return stateMatch && priorityMatch && searchMatch;
    });

    return (
        <div>
            <h2 className="text-2xl text-center text-indigo-800 font-bold mb-4">Tasks</h2>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Task Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                />
            </div>

            {/* Filter Controls */}
            <div className="flex justify-between mb-4">
                <select
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                >
                    <option value="all">All States</option>
                    <option value="todo">Todo</option>
                    <option value="doing">In Progress</option>
                    <option value="done">Completed</option>
                </select>
                <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                >
                    <option value="all">All Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <ul className="space-y-4">
                {filteredTasks.map((task) => (
                    <li key={task.id} className={`bg-gray-50 p-4 rounded-md shadow-sm flex justify-between gap-4 items-center ${task.status === 'done' ? 'bg-green-100' : task.status === 'doing' ? 'bg-orange-100' : ''}`}>
                        <div className="flex-grow">
                            {/* {task.image && task.image instanceof File && (
                                <img
                                    src={URL.createObjectURL(task.image)}
                                    alt={task.title}
                                    className="w-16 h-16 object-cover rounded-md mb-2"
                                />
                            )} */}
                            {task.image && (
                    <img
                        src={task.image} // Directly use the Base64 string
                        alt={task.title}
                        className="w-16 h-16 object-cover rounded-md mb-2"
                    />
                )}
                           
                            <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>
                            {task.description && <p className="text-gray-600">{task.description}</p>}
                            <p className="text-sm mt-1 font-semibold">
                                Priority: <span className="italic">{task.priority}</span>
                            </p>
                            <p className="text-sm mt-1 font-semibold">
                                Status: <span className="italic underline">{task.status}</span>
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            <EditTask task={task} />
                            <button
                                onClick={() => handleDelete(task.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
