import React from 'react';

export const Home: React.FC<{}> = React.memo(() => {
  return (
    <div className="container text-center home-page">
      <h1 className="pt-5">
        Home Page
      </h1>
    </div>
  );
});
