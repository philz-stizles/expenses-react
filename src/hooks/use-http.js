import { useCallback, useState } from "react";
// const useHttp = (config, applyData) => {
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const sendRequest = useCallback(async () => {
  const sendRequest = useCallback(async ({ endpoint, method, headers, body}, callback) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_URL}/${endpoint}.json`,
        {
          method: method || "GET",
          headers: headers || {},
          body: body ? JSON.stringify(body) : null,
        }
      );
      if (!response.ok) {
        throw Error("Request failed. Please try again later.");
      }

      const data = await response.json();
      callback(data);
    } catch (error) {
      setError(error.message || "Something went wrong");
    }

    setIsLoading(false);
    // }, [config.url, config.method, config.headers, config.body, applyData]);
  }, []);

  return { isLoading, error, sendRequest };
};

export default useHttp;
