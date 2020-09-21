import { combineReducers } from "redux";
import { useReducer } from "react";
import PlayerReducer from "./player";
import FavoriteReducer from "./favorite";

const rootReducer = combineReducers({
  player: PlayerReducer,
  favorite: FavoriteReducer,
});

export default rootReducer;
