
import { useState, useEffect } from 'react';

const useMockApi = <T,>(mockData: T) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      setError(null);
      setTimeout(() => {
        try {
          setData(mockData);
        } catch (e) {
          setError('Failed to fetch data');
        } finally {
          setLoading(false);
        }
      }, 1000); // Simulate network delay
    };

    fetchData();
  }, [mockData]);

  return { data, loading, error };
};

export default useMockApi;
