import { useState, useEffect } from "react";

export const useGeoLocation = () => {
  const [location, setLocation] = useState(null);
  const [userIP, setUserIP] = useState(null);
  const [city, setCity] = useState(null);
  const [region, setRegion] = useState(null);

  // Only run on mount and unmount
  useEffect(() => {
    const setValues = (json) => {
      setLocation(json);
      setUserIP(json.ip);
      setCity(json.city);
      setRegion(json.region);
    };

    fetch("https://ipapi.co/json")
      .then((data) => data.json())
      .then((json) => {
        setValues(json);
      })
      .catch((err) => console.log(err));
  }, []);

  return {
    location,
    setLocation,
    userIP,
    city,
    region,
  };
};
