import React from 'react';

const ReceivedDataComponent = ({ data }) => {
  return (
    <div>
      <h2>Received Data</h2>
      <pre>{data}</pre>
    </div>
  );
};

export default ReceivedDataComponent;