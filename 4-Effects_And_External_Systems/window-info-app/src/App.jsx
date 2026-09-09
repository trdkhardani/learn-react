import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)
  const [status, setStatus] = useState(navigator.onLine)

  const handleResizeWidth = () => {
    setWidth(window.innerWidth)
  }

  const handleResizeHeight = () => {
    setHeight(window.innerHeight)
  }

  const handleOnline = () => {
    // setStatus(navigator.onLine)
    setStatus(true)
    console.log('System online')
  }

  const handleOffline = () => {
    // setStatus(navigator.onLine)
    setStatus(false)
    console.log('System offline')
  }

  useEffect(() => {
    window.addEventListener("resize", () => handleResizeWidth)
    window.addEventListener("resize", () => handleResizeHeight)

    return () => {
      window.removeEventListener("resize", () => handleResizeWidth)
      window.removeEventListener("resize", () => handleResizeHeight)
    }
  }, [])

  useEffect(() => {
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return (
    <>
    <main>
      <h1>Window Information</h1>
      <p>Width: {width}</p>
      <p>Height: {height}</p>
      <p>Status: {status ? 'Online' : 'Offline'}</p>
    </main>
    </>
  )
}

export default App
