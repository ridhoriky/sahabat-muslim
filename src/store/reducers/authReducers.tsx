interface AuthState {
  authStatus: string | null;
  user: string | null;
}

const authState = {
  authStatus: localStorage.getItem('isAuth'),
  user: localStorage.getItem('user'),
};

type Action = { type: string; payload: number };

const authReducers = (state: AuthState = authState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default authReducers;
