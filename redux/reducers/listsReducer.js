//the ids for the list and the control number for the completed items list
let i = 0;

//state for the lists
const lists = (state = [], action) => {
  switch (action.type) {
    //create a new list
    case "CREATE_NEW_LIST":
      return [
        ...state,
        {
          name: action.name,
          items: [],
          completedItems: []
        }
      ];

    //delete a list
    case "REMOVE_LIST":
      return state.filter((list, index) => index !== action.payload);

    //add a item to a specific list
    case "ADD_LIST_ITEM":
      return state.map((list, index) => {
        if (action.listId === index) {
          return {
            ...list,
            items: [
              ...list.items,
              {
                itemName: action.itemName,
                itemQuantity: action.itemQuantity,
                isComplete: false
              }
            ]
          };
        }
        return list;
      });

    //check off an item once it has been completed
    case "COMPLETE_LIST_ITEM":
      return state.map((list, index) => {
        if (action.listId === index) {
          return {
            ...list,
            items: list.items.map((item, index) => {
              if (action.itemId === index) {
                return { ...item, isComplete: action.isComplete };
              }
              return item;
            })
          };
        }
        return list;
      });

    //delete an item from a specific list
    case "DELETE_LIST_ITEM":
      return state.map((list, index) => {
        if (action.listId === index) {
          list.completedItems.pop();
          return {
            ...list,
            items: list.items.filter((item, index) => index !== action.payload)
          };
        }
        return list;
      });

    //delete all lists in the state, available only in the settings
    case "DELETE_ALL_LISTS":
      return (state = []);

    /** check to see if the item is complete,
    if it is push a number to the completedItems array,
    since we only care to see the total number of completed items we don't need any specific information about the item */
    case "CHECK_ITEM":
      if (action.payload) {
        return state.map((list, index) => {
          if (action.listId === index) {
            list.completedItems.push(i++);
          }
          return list;
        });
      } else if (!action.payload) {
        return state.map((list, index) => {
          if (action.listId === index) {
            list.completedItems.pop();
          }
          return list;
        });
      }

    //reset all the list items to be unchecked
    case "RESET_LIST":
      return state.map((list, index) => {
        if (action.payload === index) {
          return {
            ...list,
            items: list.items.map((item, index) => {
              return { ...item, isComplete: false };
              return item;
            }),
            completedItems: []
          };
        }
        return list;
      });
  }

  return state;
};

export default lists;
