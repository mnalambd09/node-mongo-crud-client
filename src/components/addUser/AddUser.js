import React, { useState } from 'react';

const AddUser = () => {
   const [user, setUser] = useState({});

   const handleSubmit = event => {
    event.preventDefault()

    fetch('http://localhost:5000/users/add', {
        method:'POST', 
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                alert('User added successfully');
                event.target.reset();
            }
        })



   }
   const handleBlur = event => {
    const field = event.target.name;
    const value = event.target.value;
    const newUser = {...user};
    newUser[field] = value;
    setUser(newUser);
    console.log(newUser)
   }


    return (
        <div>
            <h1>Please Add a New USER !!!</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={handleBlur} type="text" name="name" placeholder='name' required/> <br />
                <input onChange={handleBlur} type="email" name="email" placeholder='email' required/> <br />
                <button>Add User</button>
            </form>

       
            
        </div>
    );
};

export default AddUser;