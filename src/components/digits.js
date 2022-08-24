import React, { useState, useEffect } from "react";

export function DigitPair (props) {
    
    function onTenth (number) {
        props.tenth(number, props.unit)
    }

    function onSingle (number) {
        props.digit(number, props.unit)
    }

    return (
        <div className="DigitPair">
            <Digit onValueChange = {onTenth} type = "tenths"/> 
            <Digit onValueChange = {onSingle}/>
        </div>
    )
}

function Digit (props) {
    const [number, setNumber] = useState(0)

    useEffect(() => {
        props.onValueChange(number);
    }, [number])

    function increment () {
        const overflow = props.type === "tenths" ? 5 : 9
        if (number === overflow) {
            setNumber (0)
        } else {
            setNumber (prevState => (prevState + 1));
        }       
    }

    function decrement () {
        const overflow = props.type === "tenths" ? 5 : 9
        if (number === 0) {
            setNumber (overflow)
        } else {
            setNumber (prevState => (prevState - 1))
        }
    }

    return (
        <div>
            <button className="button" onClick={increment}>UP</button>
            <p className = "DigitText">{number}</p>
            <button className="button" onClick={decrement}>DOWN</button>
        </div>

    )
}
