import React from "react";

const Error = (props)=>{
    if(props.message)
        return (<div className="center">
            {props.message}
        </div>)
    return (<div>
        OOPS. This page is under construction
    </div>);
}

export default Error;