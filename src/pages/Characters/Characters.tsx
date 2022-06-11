import React from 'react';
import { CharactersList } from '../../components/CharactersList';

export const Characters: React.FC<{}> = React.memo(() => {
  return (
    <CharactersList />
  );
});
