import React, { useContext, createContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities_loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city_loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city_added":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city_removed":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id != action.payload),
        currentCity: {},
      };
    case "error":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(cityReducer, initialState);

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: "loading" });
      try {
        const res = await fetch("http://localhost:8000/cities");
        if (!res.ok) {
          throw new Error("fail to load cities");
        }
        const data = await res.json();
        dispatch({ type: "cities_loaded", payload: data });
      } catch (e) {
        dispatch({ type: "error", payload: e.message });
      }
    };
    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) == currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`http://localhost:8000/cities/${id}`);
      if (!res.ok) {
        throw new Error("fail to load cities");
      }
      const data = await res.json();
      dispatch({ type: "city_loaded", payload: data });
    } catch (e) {
      dispatch({ type: "error", payload: e.message });
    }
  }

  async function addNewCity(city) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch("http://localhost:8000/cities/", {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      dispatch({ type: "city_added", payload: data });
      console.log(data);
    } catch (e) {
      console.log(e.message);
      dispatch({ type: "error", payload: e.message });
    }
  }

  async function removeCity(id) {
    dispatch({ type: "loading" });
    try {
      // setIsLoading(true);
      await fetch(`http://localhost:8000/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city_removed", payload: id });
    } catch (e) {
      console.log(e.message);
      dispatch({ type: "error", payload: e.message });
    }
  }

  const { cities, isLoading, currentCity } = state;

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        addNewCity,
        removeCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("CitiesContext was used outside the CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
