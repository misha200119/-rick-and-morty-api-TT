/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/rules-of-hooks */

import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import Autocomplete from 'react-autocomplete';
import {
  useAppSelector as useSelector,
  useAppDispatch as useDispatch,
} from '../../hooks/reduxTypedHooks';
import { CharDescription } from '../CharDescription';
import {
  selectors,
  loadCharactersPage,
} from '../../store/listOfCharsSlice';
import { Character } from '../../types/Character';
import { PagesNavigator } from '../PagesNavigator';

import styles from './CharactersList.module.scss';

export const CharactersList: React.FC<{}> = React.memo(() => {
  const { charId } = useParams<{ charId: string }>();

  const searchParams = new URLSearchParams(useLocation().search);
  const currentPage = searchParams.get('page') || '1';

  const navigate = useNavigate();
  const dispath = useDispatch();
  const isLoading = useSelector(selectors.getIsListLoading);
  const pageOfCharacters = useSelector(selectors.getCharactersPage);
  const [autocompleteValue, setAutocompleteValue] = useState('');

  const setSelectedCharacterInURL = useCallback((id: string) => {
    navigate(`/list/${id}`);
  }, []);

  useEffect(() => {
    dispath(loadCharactersPage(currentPage));
  }, [currentPage]);

  if (charId) {
    return (
      <CharDescription charId={charId} />
    );
  }

  return (
    <div className="container-xl">
      {
        isLoading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <h1 className="d-flex justify-content-center">
              Characters List
            </h1>
            <div className="pb-4">
              <Autocomplete
                getItemValue={(character) => character.name}
                items={pageOfCharacters}
                renderItem={(item, isHighlighted) => (
                  <div
                    style={{ background: isHighlighted ? 'lightgray' : 'white' }}
                    key={item.id}
                  >
                    {item.name}
                  </div>
                )}
                value={autocompleteValue}
                onChange={(e) => setAutocompleteValue(e.target.value)}
                shouldItemRender={(item: Character) => (
                  item.name.toLowerCase().includes(autocompleteValue.toLocaleLowerCase()))}
                onSelect={(_, item: Character) => {
                  setAutocompleteValue('');
                  setSelectedCharacterInURL(item.id.toString());
                }}
              />
            </div>
            <ul className={styles.characterList}>
              {pageOfCharacters.map(character => (
                <li key={character.id}>
                  <div
                    className={styles.characterList__contentContainer}
                    onClick={() => (setSelectedCharacterInURL(character.id.toString()))}
                  >
                    <img
                      className={styles.characterList__image}
                      src={character.image}
                      alt="Character"
                    />
                    <h3>{character.name}</h3>
                    <p
                      className={
                        classNames(
                          'characterList__aliveStatus',
                          {
                            [styles.characterList__aliveStatus__alive]: character.status === 'Alive',
                          },
                          {
                            [styles.characterList__aliveStatus__dead]: character.status === 'Dead',
                          },
                          {
                            [styles.characterList__aliveStatus__unknown]: character.status === 'unknown',
                          },
                        )
                      }
                    >
                      {character.status}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <PagesNavigator />
          </>
        )
      }
    </div>
  );
});
