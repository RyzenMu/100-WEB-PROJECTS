import { useDispatch, useSelector } from "react-redux";
import {createUser} from './userSlice';
import {useState} from 'react';

export default function Register() {
    const dispatch = useDispatch();

    const [message, setMessage] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        //Get form data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        try {
          
          const response = await fetch("https://redux-tookit.onrender.com/api/register", {
            method : "POST",
            headers : {
              "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
          });
          
          const result = await response.json();
          
          if (response.ok) {
            console.log("User registered", result);
            dispatch(createUser(data));  
            setMessage('user registered successfully')  
          } else {
            console.error("registration failed", result.error);
            setMessage(`${result.error}`)
          }
        } catch(error) {
          console.error ("Error connecting to server", error);
          setMessage('Error connecting to server')
        }
    }
    const {username, password1, password2} = useSelector(state => state.user);
   return (
    <form onSubmit={handleSubmit}>
      <div className="bg-stone-400 flex items-center justify-center h-screen">
        <div className="h-[300px] bg-white w-[300px] rounded-2xl">
          <div className=" p-2 m-2 flex gap-2 mt-7">
            <label>User name</label>
            <input
              name="username"
              type="text"
              placeholder="username"
              className="border rounded-full"
            />
          </div>
          <div className=" p-2 m-2 flex gap-2">
            <label>Password</label>
            <input
              name="password1"
              type="password"
              placeholder="password"
              className="border rounded-full"
            />
          </div>
          <div className=" p-2 m-2 flex gap-2">
            <label>Re-type password</label>
            <input
              name="password2"
              type="password"
              placeholder="re-type-password"
              className="border rounded-full"
            />
          </div>
          <div className="mt-10 block flex justify-center">
            <button className="bg-yellow-300 rounded-full border p-2" type="submit">
              Sign up
            </button>
          </div>
          {message && <p className="text-center mt-2">{message}</p>}
        </div>
      </div>
      <div>{`${username}, ${password1}, ${password2}`}</div>
    </form>
  );
}
