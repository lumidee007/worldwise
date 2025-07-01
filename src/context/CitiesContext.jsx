import React, { useContext, createContext, useState, useEffect } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:8000/cities");
        if (!res.ok) {
          throw new Error("fail to load cities");
        }
        const data = await res.json();
        setCities(data);
      } catch (e) {
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:8000/cities/${id}`);
      if (!res.ok) {
        throw new Error("fail to load cities");
      }
      const data = await res.json();
      setCurrentCity(data);
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
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
