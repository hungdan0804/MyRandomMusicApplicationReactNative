export const insertFavoriteSong = (track) => {
  return { type: "INSERT", payload: track };
};
export const deleteFavoriteSong = (track) => {
  return { type: "DELETE", payload: track };
};
