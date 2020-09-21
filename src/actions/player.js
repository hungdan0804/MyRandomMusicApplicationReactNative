export const loadTrack = (tracks) => {
  return {
    type: "LOAD",
    payload: tracks,
  };
};
export const playPauseTrack = (tracks) => {
  return {
    type: "PLAY-PAUSE",
    payload: tracks,
  };
};
export const nextTrack = (tracks) => {
  return {
    type: "NEXT",
    payload: tracks,
  };
};
export const previousTrack = (tracks) => {
  return {
    type: "PREVIOUS",
    payload: tracks,
  };
};
export const swipeTrack = (tracks) => {
  return {
    type: "SWIPE",
    payload: tracks,
  };
};
