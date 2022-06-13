import { Character } from './Character';

type info = {
  count: number,
  pages: number,
  next: string | null,
  prev: string | null,
};

export interface CharactersResponse {
  error?: string;
  info: info;
  results: Array<Character>;
}
