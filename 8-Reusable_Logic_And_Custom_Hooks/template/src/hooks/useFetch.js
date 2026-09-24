import { useEffect, useState } from 'react';
import { genericFetch } from '../api/generic';

export function useFetch(url) {
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setState({
          loading: true,
          error: null,
          data: null,
        });

        const data = await genericFetch(url, controller.signal);

        setState({
          data: data
        });
      } catch (err) {
        if (err.name === "AbortError")
          return

        setState({error: err.message});
      } finally {
        if (!controller.signal.aborted)
          setState({loading: false})
      }
    })()

    return () => {
      controller.abort();
    }
  }, [url])

  return state;
}