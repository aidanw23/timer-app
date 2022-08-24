import { DigitPair } from './digits.js';
import { Running } from './Running.js';
import { Alarm } from './Alarm.js';
import React, { useState, useEffect } from "react";
import { DateTime, Duration } from 'luxon';


export function Timer (props) {

    /* TO DO:
        When timer ends, page changes again to show alarm! Tab should flash, sound should play, and only option should be end or restart
        Work out how to do really nice arrow buttons?
        work out how to make really nice ui
      */

    const [duration, setDuration] = useState([0,0,0])
    const [running, setRunning] = useState(false);
    const [alarm, setAlarm] = useState(false)

    //fuction to be activated by start button
    function timeStart () {
        setRunning(true)
    }

    function stopTimer (shouldAlarm = true) {
        setRunning(false);
        setAlarm(shouldAlarm);
    }

    function stopAlarm() {
        setAlarm(false);
    }
    
    

    //handleDigit and handleTenth are elvating values from Digit componenets to Timer app so they can be read and edited here as a central main component
    function handleDigitChange (digit, unit) {
        switch (unit) {
            case "hours":
                setDuration(prevState => [(Math.floor(prevState[0] / 10) * 10) + digit, prevState[1], prevState[2]])
                break;
            case "minutes":
                setDuration(prevState => [prevState[0], (Math.floor(prevState[1] / 10) * 10) + digit, prevState[2]])
            case "seconds":
                setDuration(prevState => [prevState[0], prevState[1], (Math.floor(prevState[2] / 10) * 10) + digit])
                break;
        }
    }
    function handleTenthChange (tenth, unit) {
        switch (unit) {
            case "hours":
                setDuration(prevState => [(tenth * 10) + (prevState[0] % 10) ,prevState[1], prevState[2]])
                break;
            case "minutes":
                setDuration(prevState => [prevState[0], (tenth * 10) + (prevState[1] % 10), prevState[2]])
                break;
            case "seconds":
                setDuration(prevState => [prevState[0], prevState[1], (tenth * 10) + (prevState[2] % 10)])
                break;
        }
    }

    return (
        <div className="Timer">
            {alarm === true && 
                <Alarm alarmState = {alarm} stop = {stopAlarm} />
            }
            {running === true &&
            <div className="RunningContainer" >
                <Running duration = {duration} isRunning = {running} onEnd = {stopTimer} />
            </div>
            }
            {(running === false & alarm === false) ?
            <div className="Setup">
                <div className = "UnitContainer">
                    <div className="Unit">
                        <h3>Minutes</h3>
                        <DigitPair unit = "minutes"  tenth = {handleTenthChange} digit = {handleDigitChange}/>
                    </div> 
                    <div className="Unit">
                        <h3>Seconds</h3>
                        <DigitPair unit = "seconds"  tenth = {handleTenthChange} digit = {handleDigitChange}/>
                    </div> 
                </div>
                <button className="button start" onClick = {timeStart}>START</button>
            </div> : null
            }
        </div>
    )
}
