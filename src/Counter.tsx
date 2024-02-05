import {forwardRef, useImperativeHandle, useState} from "react";

export type CounterRef = {
    increment: () => void;
    decrement: () => void;
}
interface CounterProps {
    initialCount: number;
    ref: CounterRef;
}
export const Counter = forwardRef(({initialCount}: CounterProps, ref) => {

    const [count, setCount] = useState(initialCount)
    const increment = () => {
        console.log('increment');
        setCount(count + 1)
    }
    const decrement = () => setCount(count - 1)

    useImperativeHandle(ref, () => ({
        increment,
        decrement
    }), [increment, decrement]);

    return (
        <div className="counter">
            <h2 className="counter__header">Counter</h2>
            <h3 className="counter__value">{count}</h3>
            <div className="counter__actions">
                <button className="counter__actions__button" onClick={() => increment()}>+</button>
                <button className={`counter__actions__button ${count === 0 ? 'counter__actions__button-disabled' : ''}`} onClick={() => decrement()} disabled={count === 0}>-</button>
            </div>
        </div>
    )
});