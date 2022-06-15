import React from 'react';

import styles from './Footer.module.scss';
import gitIcon from '../../images/GitHubIcon.svg';

export const Footer:React.FC<{}> = React.memo(() => {
  return (
    <div className="d-flex
      gap-1
      justify-content-center
      align-items-center"
    >
      <p className="mb-0">
        Created by Misha Kravtsov
      </p>
      <a
        href="https://github.com/misha200119"
        rel="noreferrer"
        target="_blank"
        className="btn btn-floating btn-lg m-0 p-0"
      >
        <img
          src={gitIcon}
          alt="GitHub"
          className={styles.icon}
        />
      </a>
    </div>
  );
});
