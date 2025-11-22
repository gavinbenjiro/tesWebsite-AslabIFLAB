import { useState, useEffect } from "react";

export default function useFetch(promiseFactory) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    promiseFactory()
      .then((res) => mounted && setData(res.data))
      .catch((err) => mounted && setError(err))
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, [promiseFactory]);

  return { data, loading, error };
}
