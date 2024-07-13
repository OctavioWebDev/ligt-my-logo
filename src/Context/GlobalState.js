import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  textInput: '',
  selectedFont: 'pacifico',
  selectedColor: '#2196f3',
  size: { width: 0, height: 0 },
  tubeColor: '',
  backingType: 'acrylic',
  location: 'inside',
  customSize: { width: 0, height: 0 },
};

const GlobalStateContext = createContext(initialState);
const GlobalDispatchContext = createContext(() => {});

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TEXT_INPUT':
      return { ...state, textInput: action.payload };
    case 'SET_SELECTED_FONT':
      return { ...state, selectedFont: action.payload };
    case 'SET_SELECTED_COLOR':
      return { ...state, selectedColor: action.payload };
    case 'SET_SIZE':
      return { ...state, size: action.payload };
    case 'SET_TUBE_COLOR':
      return { ...state, tubeColor: action.payload };
    case 'SET_BACKING_TYPE':
      return { ...state, backingType: action.payload };
    case 'SET_LOCATION':
      return { ...state, location: action.payload };
    case 'SET_CUSTOM_SIZE':
      return { ...state, customSize: action.payload };
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item !== action.payload) };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
export const useGlobalDispatch = () => useContext(GlobalDispatchContext);