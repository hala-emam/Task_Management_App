
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../features/taskSlice";

function EditTask({ task }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority || 'Medium'); 
  const [image, setImage] = useState(task.image || null);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    const updatedTask = {
      id: task.id,
      title,
      description,
      status,
      priority,
      image,
    };
    
    dispatch(editTask(updatedTask));
    setIsEdit(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div>
      {isEdit ? (
        <div className="absolute bg-white p-4 rounded-md shadow-lg z-10">
          <h2 className='text-xl mb-3 font-semibold text-indigo-500'>Edit Task</h2>
          
          
          <div className='mb-4'>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2'
            />
          </div>

         
          <div className='mb-4'>
            <input
              type="text"
              placeholder='Task Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2'
            />
          </div>

          <div className='mb-4'>
            <textarea
              placeholder='Description'
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2'
              rows='3'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

       
          <div className='mb-4'>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

         
          <div className='mb-4'>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
            >
              <option value="todo">Todo</option>
              <option value="doing">In Progress</option>
              <option value="done">Completed</option>
            </select>
          </div>

          
          <div className="flex justify-between">
            <button
              type="submit"
              onClick={handleEdit}
              className="px-2 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
            <button onClick={() => setIsEdit(false)} className="bg-gray-300 py-2 px-2 rounded-md">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsEdit(true)} className='px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600'>Edit</button>
      )}
    </div>
  );
}

export default EditTask;
