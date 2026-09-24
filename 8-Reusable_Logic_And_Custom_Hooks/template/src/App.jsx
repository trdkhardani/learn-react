import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { usePrevious } from "./hooks/usePrevious";

function App() {
  const [count, setCount] = useState(0);

  const previousCount = usePrevious(count);

  return (
    <>
      <p>Current: {count}</p>
      <p>Previous: {previousCount}</p>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  );
}

export default App;
