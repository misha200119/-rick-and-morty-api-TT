import classNames from 'classnames';
import React, { useEffect } from 'react';
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
          <div className={styles.charDescription}>
            <h1>
              {selectedCharacter?.name}
            </h1>
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
                  'album py-5 bg-light',
                  styles.charDescription__listEpisodes,
                )
              }
            >
              {
                selectedCharacter?.episode.map(episode => (
                  <div key={episode}>
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
              {selectedCharacter?.status}
            </p>
            <p>
              <strong>
                Created:
              </strong>
              &nbsp;
              {selectedCharacter?.created}
            </p>
          </div>
        )
      }
    </>
  );
});
