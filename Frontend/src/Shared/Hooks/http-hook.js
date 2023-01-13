import { useCallback, useEffect, useState, useRef } from "react";

const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortControl = new AbortController();
      activeHttpRequests.current.push(httpAbortControl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortControl.signal,
        });
        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortControl
        );

        console.log(response);
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message +"This is me");
        setIsLoading(false);
        throw new Error(err.message);
      }
    },
    []
  );
  const errorHandler = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCntrl) => abortCntrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, errorHandler };
};

export default useHttpClient;