const loginStatus = (state = {isLoggedIn: false, token:'', user: {}}, action) => {
    switch (action.type) {
      case 'SET_LOGIN_STATUS':
        return {
            ...state,
            isLoggedIn: action.token? true:false,
            token: action.token
        }
      case 'SET_USER_INFO':
        return {
          ...state,
          user: action.user, 
        }
      default:
        return state
    }
  }
  
  export default loginStatus;