import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AUTH_ACTIONS, REQUEST_ACTIONS, RESPONSE_ACTIONS } from './actionsTypes';

// Configuración de la API
const getApiUrl = () => {
  const baseUrl = process.env.REACT_APP_API_URL || window.$urlService || 'http://localhost:3001';
  return `${baseUrl}/forgot`;
};

// Action para limpiar errores
export const clearForgotError = createAction(AUTH_ACTIONS.CLEAR_ERROR);

// Action para manejar respuestas
export const sendResponse = createAction(RESPONSE_ACTIONS.SET_MESSAGE, (status, message) => ({
  payload: { status, message, timestamp: Date.now() }
}));

// Async thunk para forgot password usando RTK
export const forgotPassword = createAsyncThunk(
  AUTH_ACTIONS.FORGOT_PASSWORD_PENDING,
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const apiUrl = getApiUrl();
      
      // Validación básica
      if (!userData || !userData.email) {
        throw new Error('Email is required');
      }

      const response = await axios.post(`${apiUrl}/`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 segundos timeout
      });

      // Dispatch mensaje de éxito
      dispatch(sendResponse(response.status, 'Password reset email sent successfully!'));
      
      return {
        data: response.data,
        status: response.status,
        message: 'Password reset email sent successfully!'
      };

    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'An error occurred while processing your request';
      
      const statusCode = error.response?.status || 500;
      
      // Dispatch mensaje de error
      dispatch(sendResponse(statusCode, `Error: ${errorMessage}`));
      
      // Retornar error para ser manejado por el reducer
      return rejectWithValue({
        message: errorMessage,
        status: statusCode,
        timestamp: Date.now()
      });
    }
  }
);

// Actions de loading (si no usas RTK para otros actions)
export const startRequest = createAction(REQUEST_ACTIONS.START);
export const endRequest = createAction(REQUEST_ACTIONS.END);

// Action legacy para compatibilidad (deprecated - usar forgotPassword)
export const forgot = (item) => {
  return async (dispatch) => {
    console.warn('forgot() action is deprecated. Use forgotPassword() instead.');
    return dispatch(forgotPassword(item));
  };
};

// Función helper para manejo de errores (deprecated - RTK maneja esto automáticamente)
export const errorResponse = (message, error, dispatch) => {
  console.warn('errorResponse() is deprecated. Error handling is now automatic with RTK.');
  const errorMessage = `${message}: "${error}"`;
  dispatch(sendResponse(500, errorMessage));
  return { type: AUTH_ACTIONS.FORGOT_PASSWORD_ERROR, payload: { message: errorMessage } };
};

// Action de éxito (deprecated - RTK maneja esto automáticamente)
export const forgotSuccess = (data) => {
  console.warn('forgotSuccess() is deprecated. Success handling is now automatic with RTK.');
  return {
    type: AUTH_ACTIONS.FORGOT_PASSWORD_SUCCESS,
    payload: data
  };
};