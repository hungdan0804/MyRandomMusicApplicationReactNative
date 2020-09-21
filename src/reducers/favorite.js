const initialState = {
  list: [],
};

const FavoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INSERT":
      const newList = [...state.list];
      newList.push(action.payload);
      return { ...state, list: newList };
    case "DELETE":
      const newList2 = [...state.list];
      newList2.splice(action.payload);
      return { ...state, list: newList2 };
    default:
      return state;
  }
};

export default FavoriteReducer;
