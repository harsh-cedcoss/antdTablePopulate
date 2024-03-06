import React, { useState, useEffect } from 'react';
import TableRenderer from './tableRenderer';

const MainComponent = () => {
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        setRawData(result);
      })
      .catch((error) => {
        setError(error.message || 'An error occurred while fetching data');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <TableRenderer rawData={rawData} />
      )}
    </div>
  );
};

export default MainComponent;
