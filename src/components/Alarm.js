import React, { useState, useEffect } from 'react';
import alarmSound from '../media/alarm.wav'
export function Alarm (props) {

    useEffect (() => {
        console.log("Alarm go")
        
        const switcher = setInterval( function() {
            titleFlash('EasyTimer', 'Times up!')
        }
        , 1000)
         
        return () => {
            clearInterval(switcher)
            document.title = 'QuickTimer';
        }
    })

    function titleFlash (pageTitle, newTitle) {
        if (document.title === pageTitle) {
            document.title = newTitle;
        } else {
            document.title = pageTitle;
        }
    }

    return  (
        <div className='AlarmContainer'>
            <audio autoPlay loop src={alarmSound}>
                Your browser doesn't support the alarm!               
            </audio>
            <h2 className = 'AlarmText'>YOUR TIME IS UP!</h2>
            <button className="button" onClick = {props.stop}>Reset</button>
        </div>
    )
}