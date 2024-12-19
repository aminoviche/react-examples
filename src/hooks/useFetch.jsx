import React, { useState, useEffect } from 'react';

const useFetch = (url, initialValue = []) => {
  const [data, setData] = useState(initialValue);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setLoading(true);
      setErrors(null);
      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setErrors(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, errors, loading };
};

export default useFetch;
