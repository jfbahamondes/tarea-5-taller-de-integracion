import { useState, useEffect } from "react";

function useFetchEffect(url: string, initialState: any, param?: string) {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInfo(url, data);
    return () => {};
  }, [param]);

  function fetchInfo(url: string, newData: any) {
    fetch(url)
      .then((response: any) => response.json())
      .then((myJSON: any) => {
        if (myJSON.info) {
          if (myJSON.info.next) {
            fetchInfo(myJSON.info.next, {
              info: { ...newData.info, ...myJSON.info },
              results: [...newData.results, ...myJSON.results]
            });
          } else {
            setData({
              info: { ...newData.info, ...myJSON.info },
              results: [...newData.results, ...myJSON.results]
            });
            setLoading(false);
          }
        } else {
          setData(myJSON);
          setLoading(false);
        }
      });
  }
  return { data, loading };
}

export default useFetchEffect;
