import {useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Counter, CounterRef} from "./Counter.tsx";

function App() {
  const counterRef = useRef<CounterRef>(null);

  return (
    <>
      <div className="image">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React revisit</h1>
      <div className="card">
          <Counter initialCount={0} ref={counterRef}/>
          <h2>Counter Change from Parent Imperative Hook</h2>
          <button className={"button"} onClick={() => counterRef.current?.increment()}>+ From Parent</button>
          <button className={"button"}  onClick={() =>  counterRef.current?.decrement()}>- From Parent</button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
