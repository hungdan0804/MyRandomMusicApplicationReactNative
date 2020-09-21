import data from "../config/data";

const initialState = {
  list: [...data],
  selectedTrack: 0,
  playbackInstance: null,
  paused: false,
};

const PlayerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD":
      const newPlaybackInstance = action.payload.playbackInstance;
      return { ...state, playbackInstance: newPlaybackInstance };
    case "PLAY-PAUSE":
      const newPaused = action.payload.paused;
      return { ...state, paused: newPaused };
    case "NEXT":
      var increaseTrack = state.selectedTrack;
      increaseTrack++;
      return { ...state, selectedTrack: increaseTrack };
    case "PREVIOUS":
      var decreaseTrack = state.selectedTrack;
      decreaseTrack--;
      return { ...state, selectedTrack: decreaseTrack };
    case "SWIPE":
      const newSelectedTrack = action.payload.selectedTrack;
      return { ...state, selectedTrack: newSelectedTrack };
    default:
      return state;
  }
};

export default PlayerReducer;
