import { ADD_MOVIE, REMOVE_MOVIE } from "../redux/actionTypes";

import { IMovie } from "./IMovie";

export interface IAction {
  type: typeof ADD_MOVIE | typeof REMOVE_MOVIE;
  payload: IMovie;
};