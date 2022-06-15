import classNames from 'classnames';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Characters } from '../../pages/Characters';
import { Home } from '../../pages/Home';
import { NotFound } from '../../pages/NotFound';
import { Footer } from '../Footer';
import { Header } from '../Header';

import styles from './App.module.scss';

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
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Header />
      </header>
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />

          <Route path="/list/*" element={<Characters />}>
            <Route path=":charId" element={<Characters />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className={classNames(
        styles.footer,
        'bg-dark text-center text-white pb-2 pt-2',
      )}
      >
        <Footer />
      </footer>
    </div>
  );
};
