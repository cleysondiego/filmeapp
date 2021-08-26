import { IMovieItem } from './IMovie';

export interface IState {
  cart: IMovieItem[],
  removeMovie: (movie: IMovieItem) => void;
}