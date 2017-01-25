import {AUTHENTICATED} from '../constants.jsx';

const reducer = (state=null, action) => {
  switch(action.type) {
  case AUTHENTICATED:
    return action.user;
  }
  return state;
};

export default reducer; 