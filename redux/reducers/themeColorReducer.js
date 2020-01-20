//state for the theme color
const themeColor = (state = "blue", action) => {
  switch (action.type) {
    //grab the theme selected by the user and set the state equal to it
    case "SET_COLOR_THEME":
      return (state = action.payload);
  }
  return state;
};
export default themeColor;
