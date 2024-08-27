const initialState = {
  authStatus: localStorage.getItem('isAuth'),
  token: localStorage.getItem('refreshToken'),
};

const authReducers = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default authReducers;
