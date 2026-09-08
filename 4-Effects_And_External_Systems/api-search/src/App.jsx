import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

async function fetchGitHubSearchAPI(query, signal) {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${query}`,
    { signal }
  );

  if (!response.ok)
    throw new Error('Request failed');

  return response.json();
}

function GitHubRepoItem({ searchResult }) {
  return (
    <div style={{ marginBlock: 32 }}>
      <p>{searchResult.repositoryName}</p>
      <p>{searchResult.description}</p>
      <p>{searchResult.starCount}</p>
      <p>
        <a target="blank" href={searchResult.repositoryLink}>
          {searchResult.repositoryLink}
        </a>
      </p>
    </div>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    if (query.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    fetchGitHubSearchAPI(query, controller.signal)
      .then((data) => {
        if (!data.items) throw new Error("Request failed");

        setResults(
          data.items.map((item) => {
            return {
              repoId: item.id,
              repositoryName: item.name,
              description: item.description,
              starCount: item.stargazers_count,
              repositoryLink: item.html_url,
            };
          }),
        );
      })
      .catch((err) => {
        if (err.name === "AbortError")
          return

        setError(err.message);
        console.error(err);
      })
      .finally(() => {
        if (!controller.signal.aborted)
          setLoading(false)
      });

    return () => {
      controller.abort();
    }
  }, [query]);

  return (
    <>
      <h1>GitHub Repository Search</h1>
      <main>
        <label htmlFor="search">Search</label>
        <input
          value={query}
          onChange={(ev) => setQuery(ev.target.value)}
          type="text"
          name="search"
          id="search"
        />
        {loading && query.length > 0 && <p>Searching...</p>}
        {!loading && !error && query.length > 0 && results.length === 0 && (
          <p>No Repositories Found</p>
        )}
        {error.length > 0 && !loading && <p>{error}</p>}
        {loading && error.length === 0
          ? []
          : results.map((result) => (
              <GitHubRepoItem key={result.repoId} searchResult={result} />
            ))}
      </main>
    </>
  );
}

export default App;
