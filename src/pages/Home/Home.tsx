import React from 'react';

export const Home: React.FC<{}> = React.memo(() => {
  return (
    <div className="container text-center home-page">
      <h1 className="p-b-4">
        Home Page
      </h1>

      <h2>
        Created by Misha Kravtsov
      </h2>
    </div>
  );
});
