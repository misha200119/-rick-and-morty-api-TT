import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useAppSelector as useSelector,
  useAppDispatch as useDispatch,
} from '../../hooks/reduxTypedHooks';
import {
  selectors,
  loadCharacterById,
} from '../../store/characterDetailsSlice';

import styles from './CharDescription.module.scss';

interface Props {
  charId: string;
}

export const CharDescription: React.FC<Props> = React.memo(({ charId }) => {
  const dispath = useDispatch();
  const isLoading = useSelector(selectors.getIsDetailsLoading);
  const selectedCharacter = useSelector(selectors.getSelectedCharacter);
  const navigate = useNavigate();

  useEffect(() => {
    dispath(loadCharacterById(charId));
  }, []);

  return (
    <>
      {
        isLoading && selectedCharacter ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.charDescription}>
              <h1 className={styles.charDescription__title}>
                {selectedCharacter?.name}
              </h1>
              <div className={styles.charDescription__content}>
                <img
                  src={selectedCharacter?.image}
                  alt="Character"
                  className={styles.charDescription__image}
                />
                <p>
                  <strong>
                    Species:
                  </strong>
                  &nbsp;
                  {selectedCharacter?.species}
                </p>
                <p>
                  <strong>
                    Gender:
                  </strong>
                  &nbsp;
                  {selectedCharacter?.gender}
                </p>
                <p>
                  <strong>
                    Location:
                  </strong>
                  &nbsp;
                  {selectedCharacter?.location.name}
                </p>
                <p>
                  <strong>
                    Episodes:
                  </strong>
                  &nbsp;
                </p>
                <div
                  className={
                    classNames(
                      styles.charDescription__listEpisodes,
                    )
                  }
                >
                  {
                    selectedCharacter?.episode.map(episode => (
                      <div key={episode} className={styles.charDescription__listEpisodes_item}>
                        {episode.split('/')[5]}
                      </div>
                    ))
                  }
                </div>
                <p>
                  <strong>
                    Status:
                  </strong>
                  &nbsp;
                  <span
                    className={
                      classNames(
                        'characterList__aliveStatus',
                        {
                          [styles.characterList__aliveStatus__alive]: selectedCharacter?.status === 'Alive',
                        },
                        {
                          [styles.characterList__aliveStatus__dead]: selectedCharacter?.status === 'Dead',
                        },
                        {
                          [styles.characterList__aliveStatus__unknown]: selectedCharacter?.status === 'unknown',
                        },
                      )
                    }
                  >
                    {selectedCharacter?.status}
                  </span>
                </p>
                <p>
                  <strong>
                    Created:
                  </strong>
                  &nbsp;
                  {selectedCharacter?.created}
                </p>
              </div>
            </div>
            <button
              type="button"
              className={
                classNames(
                  'btn-close btn-close-red',
                  styles.closeBtn,
                )
              }
              onClick={() => {
                navigate(-1);
              }}
              aria-label="Close"
            >
            </button>
          </div>
        )
      }
    </>
  );
});
