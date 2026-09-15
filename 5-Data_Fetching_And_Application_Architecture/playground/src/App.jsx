import { useEffect, useState } from "react";
import "./App.css";
import { fetchPosts } from './api/posts';

// const fakeFetch = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const success = false
//       // const success = true

//       if (success) {
//         resolve([
//           { id: 1, title: "Alien" },
//           { id: 2, title: "Aliens" },
//           { id: 3, title: "The Thing" }
//         ]);
//       } else {
//         reject(new Error('Error occurred when fetching movies'));
//       }
//     }, 2000)
//   })
// }

// function App() {
//   const [loading, setLoading] = useState(false)
//   const [movies, setMovies] = useState([])
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     async function fetchMovies() {
//       try {
//         setLoading(true)
//         setError(null)

//         const movies = await fakeFetch()
//         // if (movies)
//         setMovies(movies)
//       } catch (err) {
//         setError(err.message)
//         console.error(err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchMovies()
//   }, [])

//   return (
//     <>
//       <main>
//         {loading && <p>Please Wait...</p>}
//         {error && <p>{error}</p>}
//         <ul>
//           {movies.map((movie) => <li key={movie.id}>{movie.title}</li>)}
//         </ul>
//       </main>
//     </>
//   )
// }

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const posts = await fetchPosts()
        // if (!posts)
        //   throw new Error('Error showing posts')

        setPosts(posts)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    })()
  }, []);

  return (
    <>
      <h1>Fetch Posts</h1>
      <main>
        {loading && <p>Please Wait...</p>}
        {error && <p>{error}</p>}
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <hr />
          </div>
        ))}
      </main>
    </>
  );
}

export default App;
