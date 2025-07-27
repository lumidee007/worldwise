import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
  }
};

const FAKE_USER = {
  name: "Andrew",
  email: "andrew@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/200?u=xx",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    if (!isAuthenticated) {
      throw new Error("You are not logged in");
    }
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const auth_context = useContext(AuthContext);
  if (auth_context === undefined) {
    throw new Error("AuthContext was used outside the CitiesProvider");
  }
  return auth_context;
}

export { AuthProvider, useAuth };
