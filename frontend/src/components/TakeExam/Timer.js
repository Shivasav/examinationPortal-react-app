import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';
const Timer = ({hoursMinSecs,stopper}) => {
    
    const { hours = 0, minutes = 0, seconds = 60 } = hoursMinSecs;
    const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);
    const [isActive, setIsActive] = useState(true);
    const history = useHistory();


    
    React.useEffect(() => {
        const reset = () => setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

        const tick = () => {
   
            if (hrs === 0 && mins === 0 && secs === 0){
                history.replace("/thankyou");
            } 
            else if (mins === 0 && secs === 0) {
                setTime([hrs - 1, 59, 59]);
                sessionStorage.setItem("timer", JSON.stringify({hours: hrs-1, minutes: 59, seconds: 59}))
            } else if (secs === 0) {
                setTime([hrs, mins - 1, 59]);
                sessionStorage.setItem("timer", JSON.stringify({hours: hrs, minutes: mins-1, seconds: 59}))
            } else {
                setTime([hrs, mins, secs - 1]);
                sessionStorage.setItem("timer", JSON.stringify({hours: hrs, minutes: mins, seconds: secs -1}))
            }
        };

        let timerId=null;
        if(isActive){
             timerId = setInterval(() => tick(), 1000);
        }
        
        if(stopper===true){
            clearInterval(timerId);
         }
         else if(stopper==="reset"){
            setIsActive(true);
            reset();
         }
         
        return () => clearInterval(timerId);
    }, [history, hours,hrs, isActive, mins, minutes, seconds, secs, stopper]);

    
    return (
        <div style={{textAlign: 'right', marginRight: 10}}>
            <p>Time Remaining: {`${hrs.toString().padStart(2, '0')}:${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p> 
        </div>
    );
}

export default Timer;