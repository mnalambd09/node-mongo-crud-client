import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedUser = useLoaderData();
    console.log(storedUser)
    const [user, setUser] = useState(storedUser);


    const handleUpdate = event => {
        event.preventDefault();

        fetch(`http://localhost:5000/users/${storedUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('User Updated')
                    console.log(data);
                }

            })
        console.log(user)

    }
    const handleInputChange = event => {
        const field = event.target.name;
        const value = event.target.value;
        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser);
        console.log(newUser)
    }
    return (
        <div>
            <h1>hello from Update <span style={{ color: "red" }}>{storedUser.name}</span></h1>
            <form onSubmit={handleUpdate}>
                <input onChange={handleInputChange} type="text" defaultValue={storedUser.name} name="name" placeholder='name' required /> <br />
                <input onChange={handleInputChange} type="email" name="email" placeholder='email' defaultValue={storedUser.email} required /> <br />
                <button>Update User</button>
            </form>
        </div>
    );
};

export default Update;