//reducer for checking whether or not the list is complete by being inside this array
const listsCompleteArray = (state = [], action) => {
  switch (action.type) {
    case "PUSH_LIST":
      if (state.indexOf(action.listId) > -1) {
        null;
      } else {
        return [...state, action.listId];
      }

    case "REMOVE_FROM_COMPLETED":
      return state.filter((listNumber, index) => listNumber !== action.listId);
  }
  return state;
};

export default listsCompleteArray;
