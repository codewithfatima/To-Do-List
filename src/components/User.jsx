import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';
import './User.css';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/getall");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:7000/api/delete/${userId}`);
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      toast.success("User data deleted successfully", { position: "top-right" });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  return (
    <div className='userTable'>
      <Link to={"/add"} className='addButton'> Add User </Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.NO</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.fname} {user.lname}</td>
              <td>{user.email}</td>
              <td className='actionButton'>
                <button onClick={() => deleteUser(user._id)}>
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
                <Link to={`/edit/${user._id}`}>
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default User;
