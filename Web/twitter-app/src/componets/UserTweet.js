import React from "react";


const UserTweet = (user) => {;

    
    return (
        <body>
            <img src={user.image}></img> 
            <p>{user.username}</p>
         </body>
        
        
    );
}

export default UserTweet;