import { signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/Firebase';

const Dashboard = () => {

  const navigate = useNavigate()

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login")
        console.log("log out hogaya");
      }).catch((error) => {
        console.log(error);
      });
  }

  const [todo, setTodo] = useState([]);
  const [value, setValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  return (
    <div>
      <button onClick={() => {
        logout()
      }}>Sign Out</button>

      <div>
        <input type="text" value={value} onChange={(e) => {
          setValue(e.target.value);
        }} />
        <button onClick={() => {
            if (editIndex !== null) {
              const updatedTodo = todo.map((item, index) => {
                if (index === editIndex) {
                  return value;
                }
                return item;
              });
              setTodo(updatedTodo);

              setEditIndex(null);
              setValue("");
            } else {
              setTodo([...todo, value]);
              setValue("");
            }
          }}>{editIndex !== null ? "Update Todo" : "Add Todo"}</button>
        <button onClick={() => {
          setTodo([])
        }}>Delete All</button>
      </div>
      <div>
        <ul>
          {todo.map((v, i) => {
            return <div key={i}>
              <li>{v}</li>
              <button onClick={() => {
                const newTodo = todo.filter((value, index) => {
                  return index !== i
                })
                setTodo(newTodo)
              }} >Delete</button>

              <button onClick={() => {
                setValue(v)
                setEditIndex(i)
              }}>Edit</button>
            </div>
          })}
        </ul>
      </div>


    </div>
  )
}

export default Dashboard