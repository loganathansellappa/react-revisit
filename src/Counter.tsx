import {forwardRef, useCallback, useImperativeHandle, useState} from "react";
import './Counter.css';

export type CounterRef = {
    increment: () => void;
    decrement: () => void;
}
interface CounterProps {
    initialCount: number;
}
export const Counter = forwardRef(({initialCount}: CounterProps, ref) => {

    const [count, setCount] = useState(initialCount)
    const increment = useCallback(() => setCount(count + 1), [setCount, count]);
    const decrement = useCallback(() => setCount(count - 1), [setCount, count])

    useImperativeHandle(ref, () => ({
        increment,
        decrement
    }), [increment, decrement]);

    return (
        <div className="counter">
            <h2 className="counter__header">Counter {count}</h2>
            <div className="counter__actions">
                <button className="counter__actions__button" onClick={() => increment()}>+</button>
                <button className={`counter__actions__button ${count === 0 ? 'counter__actions__button-disabled' : ''}`} onClick={() => decrement()} disabled={count === 0}>-</button>
            </div>
        </div>
    )
});