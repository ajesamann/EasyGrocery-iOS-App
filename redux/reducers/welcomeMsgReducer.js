//the inital state for the welcome message, this was weird for some reason
let initialState = {
  customMsgIsOn: false,
  message: "Welcome!"
};

const welcomeMsg = (state = initialState, action) => {
  switch (action.type) {
    //set the message to whatever the user types after being saved in the settings
    case "SET_MESSAGE":
      return { customMsgIsOn: action.isOn, message: action.payload };
    //check whether to use a custom welcome message or not
    case "TOGGLE_USE_MSG":
      return { ...state, customMsgIsOn: action.payload };
  }
  return state;
};
export default welcomeMsg;
