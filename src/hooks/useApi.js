import { useState, useEffect } from 'react';

export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await apiFunction();
        
        if (isMounted) {
          if (result.success) {
            setData(result.data);
          } else {
            setError(result.error);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Error en la solicitud');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction();
      
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || 'Error en la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};