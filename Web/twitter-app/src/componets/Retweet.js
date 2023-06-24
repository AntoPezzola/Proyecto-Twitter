import React from "react";
import Tweet from "./Tweet";


const Retweet = (rtw) => {

    return (
        <div className="sarasa">
            {rtw && (
                <Tweet data={rtw.children}></Tweet>
            )}
        </div>
    )
}

export default Retweet;