import React, { useState, useEffect } from 'react';
import {DateTime, Duration} from 'luxon';

export function Running (props) {
    // props being handed: 'duration' - array with 0th element hours, 1st mins, 2nd seconds 'isRunning'- boolean from timer, 'onEnd' - function to set Running false and Alarm true
    const [remaining, setRemaining] = useState(Duration.fromObject({hours: props.duration[0], minutes: props.duration[1], seconds: props.duration[2]}));
    const [endTime, setEndTime] = useState();
    const [paused, setPaused] = useState(false);

    let inter;


    //useEffect with interval calling timeGO to updating current time. Other useEffect below is to check for if current time >= end time and if so change running.
    useEffect(()=>{
        if (props.isRunning) {
            setEndTime(DateTime.now().plus(Duration.fromObject({hours: props.duration[0], minutes: props.duration[1], seconds: props.duration[2]})))
        }    
    },[props.isRunning]);

    //refreshes endtime using the remaining duration when clock is unpaused
    useEffect (() => {
        setEndTime(DateTime.now().plus(remaining))
    }, [paused])

    //close of interval for timer, if endtime is passed and timer is running, the alarm will go
    useEffect(() => {
        if(DateTime.now() >= endTime && props.isRunning){
            props.onEnd();
        }
    },[remaining])

    //sets up the interval at roughly second intervals to adjust remaining duration.
    /*NOTE: setInterval isnt that accurate temporally. to compensate function uses system time to work out remainder.
     display may skip seonds but remains time accurate. does mean timer has error margin +- 1 second.*/
    useEffect(() => {
        inter = setInterval(function() {
            if (!paused) {
                setRemaining(endTime.diff(DateTime.now()))
            }
        }, 1000);
        
        return () => {
            clearInterval(inter);
        }
    }, [endTime, paused])

    //below functions are used by buttons displayed in Running. function names are self describing.
    function stopTimer () {
        props.onEnd(false);
    }

    function pauseTimer () {
        setPaused(true);
    }

    function unpause () {
        setPaused (false);
    }

    return (
        <div className='Counter'>
            <h2>{remaining.toFormat("mm ss")}</h2>
            {!paused && <button className="button" onClick  = {stopTimer}> STOP</button>}
            {!paused && <button className="button" onClick = {pauseTimer} >PAUSE</button>}
            {paused && <button className="button" onClick = {unpause}>UNPAUSE</button>}
        </div>
    )
}