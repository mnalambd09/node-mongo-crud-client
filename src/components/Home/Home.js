import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';



const Home = () => {
    const users = useLoaderData()
    const [displayUser, setDisplayUser] = useState(users)
    console.log(displayUser)

const handleDelete = (user) => {
    const agree = window.confirm(`Are you sure you want delete ${user.name}`)
    
    if(agree) {
        // console.log('deleting user with id', user._id, process)
        fetch(`http://localhost:5000/users/${user._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.deletedCount > 0){
                    alert(`Successfully delete ${user.name}`)
                    const remainingUsers = displayUser.filter(usr => usr._id !== user._id);
                    setDisplayUser(remainingUsers)
                }
            })
    }
}    

    return (
        <div>
            <h1>Hello from Home{displayUser.length}</h1>
            {/* <AddUser></AddUser> */}
            <div>
                {
                    displayUser.map(user => <p key={user._id}> {user.name} {user.email} 
                    <Link to={`/update/${user._id}`}>
                        <button>Update</button>
                    </Link>
                    <button onClick={ () => handleDelete(user)}>X</button>
                    </p>)
                }
            </div>
        </div>
    );
};

export default Home;