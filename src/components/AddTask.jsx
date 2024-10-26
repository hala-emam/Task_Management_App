
import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid4 } from 'uuid';
import { addTask } from "../features/taskSlice";
import * as yup from 'yup';

// Validation schema using Yup
const validationSchema = yup.object().shape({
  image: yup.mixed().required('Image is required'),
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  priority: yup.string().oneOf(['Low', 'Medium', 'High'], 'Invalid priority').required('Priority is required'),
  state: yup.string().oneOf(['todo', 'doing', 'done'], 'Invalid state').required('Status is required'),
});

function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [priority, setPriority] = useState('Medium'); 
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data using Yup schema
    validationSchema.validate({ image, title, description, priority, state: status })
      .then(() => {
        const newTask = {
          id: uuid4(),
          title,
          description,
          status,
          priority,
          image,
        };
        dispatch(addTask(newTask));
        setTitle('');
        setDescription('');
        setStatus('todo');
        setPriority('Medium'); 
        setImage(null);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

 
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
        setImage(reader.result); // Set the Base64 string as the image state
    };
    if (file) {
        reader.readAsDataURL(file); // Convert the file to Base64 string
    }
};  

  return (
    <form className='mb-6' onSubmit={handleSubmit}>
      <h2 className='text-xl mb-3 font-semibold text-gray-800'>Add New Task</h2>
      
      
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

      
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
        Add Task
      </button>
    </form>
  );
}

export default AddTask;
