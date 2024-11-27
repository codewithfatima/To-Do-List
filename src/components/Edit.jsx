import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from 'axios';
import './add.css';

const Edit = () => {
  const initialUserState = {
    fname: '',
    lname: '',
    email: ''
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(initialUserState);

  const inputChangeHandle = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  useEffect(() => {
    axios.get(`http://localhost:7000/api/getone/${id}`)
      .then((response) => {
        setUser(response.data); // Assuming the response contains the user data
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    console.log('User data being updated:', user); // Log the user data
    try {
        await axios.put(`http://localhost:7000/api/update/${id}`, user)
        .then((response) => {
            toast.success("User data updated successfully", { position: "top-right" });
            navigate("/");
        })
        .catch((error) => {
            console.error('Error response data:', error.response.data); // Log the error response data
            console.error('Error response status:', error.response.status); // Log the error response status
            console.error('Error response headers:', error.response.headers); // Log the error response headers
            toast.error("An error occurred while updating the user.", { position: "top-right" });
        });
    } catch (error) {
        console.error('Error during form submission:', error); // Catch any other errors
        toast.error("An unexpected error occurred.", { position: "top-right" });
    }
};


  return (
    <div className='addUser'>
      <Link to={"/"}>Back</Link>
      <h3>Update User</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            value={user.fname}
            onChange={inputChangeHandle}
            id="fname"
            name="fname"
            autoComplete='off'
            placeholder='First Name'
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            value={user.lname}
            onChange={inputChangeHandle}
            id="lname"
            name="lname"
            autoComplete='off'
            placeholder='Last Name'
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={inputChangeHandle}
            id="email"
            name="email"
            autoComplete='off'
            placeholder='Email'
          />
        </div>
        <div className="inputGroup">
          <button type='submit'>Update User</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
