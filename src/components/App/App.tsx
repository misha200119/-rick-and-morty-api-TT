import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Characters } from '../../pages/Characters';
import { Home } from '../../pages/Home';
import { NotFound } from '../../pages/NotFound';
// import { CharDescription } from '../CharDescription';
import { Header } from '../Header';

interface Props {
  onClick: () => void;
}

export const Provider: React.FC<Props> = React.memo(
  ({ onClick, children }) => (
    <button
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  ),
);

export const App: React.FC = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />

        <Route path="/list/*" element={<Characters />}>
          <Route path=":charId" element={<Characters />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
