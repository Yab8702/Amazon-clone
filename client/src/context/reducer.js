import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firbase";
function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password);
}
function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
function logout() {
  return signOut(auth);
}
export default function reducer() {
  const initialState = {
    basket: [],
    user: {},
    login,
    logout,
    signUp,
  };
  const getBasketTotal = (basket) => {
    return basket
      ?.reduce((amount, item) => item.price * (item.quantity || 1) + amount, 0)
      .toFixed(2);
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_BASKET":
        return {
          ...state,
          basket: [...state.basket, action.item],
        };
      case "REMOVE_FROM_BASKET":
        const index = state.basket.findIndex(
          (basketItem) => basketItem.id === action.id
        );
        let newBasket = [...state.basket];
        if (index >= 0) {
          newBasket.splice(index, 1);
        }

        return {
          ...state,
          basket: newBasket,
        };
      case "CHANGE_QUANTITY":
        const index2 = state.basket.findIndex(
          (basketItem) => basketItem.id === action.id
        );
        let newBasket2 = [...state.basket];
        if (index2 >= 0) {
          newBasket2[index2].quantity = action.quantity;
        }

        return {
          ...state,
          basket: newBasket2,
        };
      case "SET_USER":
        return {
          ...state,
          user: action.user,
        };
      case "EMPTY_BASKET":
        return {
          ...state,
          basket: [],
        };
      default:
        return state;
    }
  };
  return { initialState, reducer, getBasketTotal };
}
