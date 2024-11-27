import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./add.css";
import toast, { Toaster } from 'react-hot-toast';

const Add = () => {
    const users = {
        fname: "",
        lname: "",
        email: "",
        password: ""
    };

    const [user, setUser] = useState(users);
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        console.log('User data being sent:', user); // Log the user data
        try {
            await axios.post("http://localhost:7000/api/create", user)
            .then((response) => {
                toast.success("User data entered successfully", { position: "top-right" });
                navigate("/");
            })
            .catch((error) => {
                console.error('Error response:', error.response); // Log the error response
                console.error('Error message:', error.message); // Log the error message
                toast.error("An error occurred while adding the user.", { position: "top-right" });
            });
        } catch (error) {
            console.error('Error during form submission:', error); // Catch any other errors
            toast.error("An unexpected error occurred.", { position: "top-right" });
        }
    };

    return (
        <div className='addUser'>
            <Toaster />
            <Link to={"/"}>Back</Link>
            <h3>Add New User</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="fname">First Name</label>
                    <input type="text" onChange={inputHandler} id="fname" name="fname" autoComplete='off' placeholder='First Name' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" onChange={inputHandler} id="lname" name="lname" autoComplete='off' placeholder='Last Name' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={inputHandler} id="email" name="email" autoComplete='off' placeholder='Email' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={inputHandler} id="password" name="password" autoComplete='off' placeholder='Password' />
                </div>
                <div className="inputGroup">
                    <button type='submit'>Add User</button>
                </div>
            </form>
        </div>
    );
};

export default Add;
