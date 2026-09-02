import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

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

// function App({initialValue = 2}) {
//   const [count, setCount] = useState(initialValue)

//   const plusOneWithSnapshot = () => {
//     setCount(count + 1)
//     console.log(count);
//     setTimeout(() => console.log(count), 2000)
//   }

//   // const plusThreeFunctional = () => {
//   //   setCount(prev => prev + 1)
//   //   setCount(prev => prev + 1)
//   //   setCount(prev => prev + 1)
//   // }

//   return (
//     <main>
//       <h1>Counter App</h1>
//       <button onClick={ plusOneWithSnapshot }>+1</button>
//       <button onClick={ () => setCount(count - 1) }>-1</button>
//       <button onClick={ () => setCount(initialValue) }>Reset</button>
//       <p>Snapshot count: { count }</p>
//       <p>Current count: { count }</p>
//     </main>
//   )
// }

/**
 * Name Input
 */
// function App() {
//   const [name, setName] = useState("");

//   const handleResetName = () => {
//     setName("");
//   };

//   const handleNameChange = (ev) => {
//     setName(ev.target.value);
//   };

//   return (
//     <main>
//       <h1>Name Input</h1>
//       <label htmlFor="name">Name: </label>
//       <input id="name" value={name} onChange={handleNameChange} type="text" />

//       <p>Hello, {name}</p>
//       <p>Characters: {name.length}</p>
//       <button onClick={handleResetName}>Reset</button>
//     </main>
//   );
// }

/**
 * User Selection
 */
function UserCard({ user, onUserChange }) {
  return (
    <div>
      <p>
        [{user.name}] <button onClick={() => onUserChange(user)}>Select</button>
      </p>
    </div>
  );
}

function SelectedUserPanel({ name, email }) {
  return (
    <div>
      <p>
        <strong>Selected User</strong>
      </p>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
    </div>
  );
}

function UserList() {
  const [selectedUser, setSelectedUser] = useState({});
  const users = [
    {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
    },
    {
      id: 2,
      name: "Bob",
      email: "Bob@example.com",
    },
    {
      id: 3,
      name: "Charlie",
      email: "Charlie@example.com",
    },
  ];

  return (
    <>
      {users.map((user) => (
        <UserCard key={user.id} user={user} onUserChange={setSelectedUser} />
      ))}
      <SelectedUserPanel name={selectedUser.name || '-'} email={selectedUser.email || '-'} />
    </>
  );
}

function App() {
  return (
    <main>
      <h1>User Selection</h1>
      <UserList />
    </main>
  );
}

export default App;
