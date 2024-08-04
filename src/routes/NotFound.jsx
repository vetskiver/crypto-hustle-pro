import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h2>Page Not Found</h2>
      <p>The page you're looking for does not exist.</p>
      <Link to="/">Go back to the Home Page</Link>
    </div>
  );
};

export default NotFound;
