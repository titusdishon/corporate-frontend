import * as actions from '../constants';

const initialState = {
  loggedIn: false,
  registered:false,
  loginErrors:null,
  driverLErrors:null,
  active:false,
  registrationErrors:null,
  step:0,
  files:[],
  user: {
  }
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SESSION_LOGIN_SUCCESSFUL: {
      return {
        ...state,
        loggedIn:true,
        active:true,
      };
    }
    default: {
      return state;
    }
  }
};

export default sessionReducer;
