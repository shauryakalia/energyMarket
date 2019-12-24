import React from 'react';

// Class for displaying "Copyright"
const Copyright = () => {
  const year = new Date().getFullYear();
  return (
    <div>
      <div className="copyright-text">
        {' '}
        <div>
          Copyright &#169;
          <span>{year}</span>
          {' '}
          Verde Blocks.
        </div>
      </div>
      <div className="copyright-text">
        {' '}
        <div>All rights reserved.</div>
      </div>
    </div>
  );
};

export default Copyright;
