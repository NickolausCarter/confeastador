import { useReducer } from 'react';
import {
  ADD_RESERVATION,
  REMOVE_RESERVATION,
  UPDATE_RESERVATION,
  TOGGLE_RESERVATIONS,
  UPDATE_CURRENT_CATEGORY
} from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_RESERVATION:
      return {
        ...state,
        reservation: [...action.reservation]
      };

    case REMOVE_RESERVATION:
      let newState = state.reservation.filter(reservation => {
        return reservation._id !== action._id;
      });

      return {
        ...state,
        reservationsOpen: newState.length > 0,
        reservation: newState
      };

    case UPDATE_RESERVATION:
      return {
        ...state,
        reservation: [...action.reservation]
      }

    case TOGGLE_RESERVATIONS:
      return {
        ...state,
        reservationsOpen: !state.reservationsOpen
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      };

    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState)
};