// Action Types usando constantes con prefijos para evitar colisiones
export const REQUEST_STATES = {
  IDLE: 'request/idle',
  LOADING: 'request/loading',
  SUCCESS: 'request/success',
  ERROR: 'request/error'
};

// Auth Action Types
export const AUTH_ACTIONS = {
  SIGNIN_PENDING: 'auth/signin/pending',
  SIGNIN_SUCCESS: 'auth/signin/success',
  SIGNIN_ERROR: 'auth/signin/error',
  SIGNUP_PENDING: 'auth/signup/pending',
  SIGNUP_SUCCESS: 'auth/signup/success',
  SIGNUP_ERROR: 'auth/signup/error',
  FORGOT_PASSWORD_PENDING: 'auth/forgotPassword/pending',
  FORGOT_PASSWORD_SUCCESS: 'auth/forgotPassword/success',
  FORGOT_PASSWORD_ERROR: 'auth/forgotPassword/error',
  LOGOUT: 'auth/logout',
  CLEAR_ERROR: 'auth/clearError'
};

// Request Action Types
export const REQUEST_ACTIONS = {
  START: 'request/start',
  END: 'request/end',
  SET_LOADING: 'request/setLoading',
  SET_ERROR: 'request/setError',
  CLEAR_ERROR: 'request/clearError',
  SET_SUCCESS: 'request/setSuccess'
};

// Response Action Types
export const RESPONSE_ACTIONS = {
  SET_MESSAGE: 'response/setMessage',
  CLEAR_MESSAGE: 'response/clearMessage',
  SET_STATUS: 'response/setStatus'
};

// Legacy constants para compatibilidad hacia atrás (si es necesario)
export const RESPONSE_REQUEST = RESPONSE_ACTIONS.SET_MESSAGE;
export const ERROR = REQUEST_ACTIONS.SET_ERROR;
export const START_REQUEST = REQUEST_ACTIONS.START;
export const END_REQUEST = REQUEST_ACTIONS.END;
export const SIGNIN = AUTH_ACTIONS.SIGNIN_SUCCESS;
export const SIGNUP = AUTH_ACTIONS.SIGNUP_SUCCESS;
export const FORGOT_PASSWORD = AUTH_ACTIONS.FORGOT_PASSWORD_SUCCESS;