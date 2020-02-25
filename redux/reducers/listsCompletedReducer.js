//the number for total lists completed
const totalListsCompleted = (state = 0, action) => {
  switch (action.type) {
    case "ADD_ONE":
      return state + 1;

    case "SUBTRACT_ONE":
      return state - 1;
  }
  return state;
};

export default totalListsCompleted;
