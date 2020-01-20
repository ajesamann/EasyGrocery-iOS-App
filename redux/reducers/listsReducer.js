//the ids for the list and the control number for the completed items list
let id = 0;
let itemId = 0;
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
          completedItems: [],
          id: id++
        }
      ];

    //delete a list
    case "REMOVE_LIST":
      return state.filter(list => list.id !== action.payload);

    //add a item to a specific list
    case "ADD_LIST_ITEM":
      return state.map(list => {
        if (action.listId === list.id) {
          return {
            ...list,
            items: [
              ...list.items,
              {
                itemName: action.itemName,
                itemQuantity: action.itemQuantity,
                itemId: itemId++,
                isComplete: false
              }
            ]
          };
        }
        return list;
      });

    //check off an item once it has been completed
    case "COMPLETE_LIST_ITEM":
      return state.map(list => {
        if (action.listId === list.id) {
          return {
            ...list,
            items: list.items.map(item => {
              if (action.itemId === item.itemId) {
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
      return state.map(list => {
        if (action.listId === list.id) {
          list.completedItems.pop();
          return {
            ...list,
            items: list.items.filter(item => item.itemId !== action.payload)
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
        return state.map(list => {
          if (action.listId === list.id) {
            list.completedItems.push(i++);
          }
          return list;
        });
      } else if (!action.payload) {
        return state.map(list => {
          if (action.listId === list.id) {
            list.completedItems.pop();
          }
          return list;
        });
      }

    //reset all the list items to be unchecked
    case "RESET_LIST":
      return state.map(list => {
        if (action.payload === list.id) {
          return {
            ...list,
            items: list.items.map(item => {
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
