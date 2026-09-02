import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

// function App() {
//   const startingValue = 5
//   const [count, setCount] = useState(startingValue)

//   return (
//     <main>
//       <h1>Counter App</h1>
//       <button onClick={ () => setCount(count + 1) }>+</button>
//       <button onClick={ () => setCount(count - 1) }>-</button>
//       <button onClick={ () => setCount(startingValue) }>Reset</button>
//       <p>Current count: { count }</p>
//     </main>
//   )
// }

// function App({initialValue = 2}) {
//   const [count, setCount] = useState(initialValue)

//   return (
//     <main>
//       <h1>Counter App</h1>
//       <button onClick={ () => setCount(count + 1) }>+1</button>
//       <button onClick={ () => setCount(count - 1) }>-1</button>
//       <button onClick={ () => setCount(count + 3) }>+3</button>
//       <button onClick={ () => setCount(initialValue) }>Reset</button>
//       <p>Current count: { count }</p>
//     </main>
//   )
// }

// function App({initialValue = 2}) {
//   const [count, setCount] = useState(initialValue)

//   const plusThreeSnapshot = () => {
//     setCount(count + 1)
//     setCount(count + 1)
//     setCount(count + 1)
//   }

//   const plusThreeFunctional = () => {
//     setCount(prev => prev + 1)
//     setCount(prev => prev + 1)
//     setCount(prev => prev + 1)
//   }

//   return (
//     <main>
//       <h1>Counter App</h1>
//       <button onClick={ () => setCount(count + 1) }>+1</button>
//       <button onClick={ () => setCount(count - 1) }>-1</button>
//       <button onClick={ plusThreeSnapshot }>+3 (Snapshot)</button>
//       <button onClick={ plusThreeFunctional }>+3 (Functional)</button>
//       <button onClick={ () => setCount(initialValue) }>Reset</button>
//       <p>Snapshot count: { count }</p>
//       <p>Current count: { count }</p>
//     </main>
//   )
// }

function App({initialValue = 2}) {
  const [count, setCount] = useState(initialValue)

  const plusOneWithSnapshot = () => {
    setCount(count + 1)
    console.log(count);
    setTimeout(() => console.log(count), 2000)
  }

  // const plusThreeFunctional = () => {
  //   setCount(prev => prev + 1)
  //   setCount(prev => prev + 1)
  //   setCount(prev => prev + 1)
  // }

  return (
    <main>
      <h1>Counter App</h1>
      <button onClick={ plusOneWithSnapshot }>+1</button>
      <button onClick={ () => setCount(count - 1) }>-1</button>
      <button onClick={ () => setCount(initialValue) }>Reset</button>
      <p>Snapshot count: { count }</p>
      <p>Current count: { count }</p>
    </main>
  )
}

export default App
