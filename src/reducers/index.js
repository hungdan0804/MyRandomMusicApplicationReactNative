import { combineReducers } from "redux";
import { useReducer } from "react";
import PlayerReducer from "./player";

const rootReducer = combineReducers({
  player: PlayerReducer,
});

export default rootReducer;
