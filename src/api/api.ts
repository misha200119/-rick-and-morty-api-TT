import { CharactersResponse } from '../types/CahractersResponse';
import { Character } from '../types/Character';

export const BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = async (numberPage: string): Promise<CharactersResponse> => {
  const response = await fetch(`${BASE_URL}/character/?page=${numberPage}`);

  return response.json();
};

export const getCharacterById = async (id: string): Promise<Character> => {
  const response = await fetch(`${BASE_URL}/character/${id}`);

  return response.json();
};
