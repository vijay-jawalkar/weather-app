import React from "react";
import { useState, useEffect } from "react";

function Home() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: null,
  });
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=bhopal`
        );
        const json = await response.json();
        setWeather({ ...weather, data: json, loading: true });
      } catch (error) {
        setWeather({ ...weather, error: "city not found", loading: false });
      }
    };

    handleSearch();
  }, []); //eslint-disable-line

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setInput("");

      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${input}`
        );
        const json = await response.json();

        if (json.location) {
          setWeather({ ...weather, data: json, loading: true });
        } else {
          setWeather({
            ...weather,
            data: {},
            error: "city not found",
            loading: false,
          });
        }
      } catch (error) {
        setWeather({
          ...weather,
          data: {},
          error: "city not found",
          loading: false,
        });
        console.log(error);
      }
    }
  };

  if (weather.error) {
    console.log("City match not found");
  }

  return (
    <div className="h-screen  ">
      <form className="px-4">
        <input
          type="text"
          placeholder="Your City Name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleSearch}
          className="w-full p-2 my-4 rounded"
        />
      </form>

      <div className="pl-4">
        <label className="relative inline-flex items-center mb-5   cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm text-gray-900 dark:text-gray-300 font-semibold">
            {isChecked ? "Switch To Celsius " : "Switch To Fahrenheit"}
          </span>
        </label>
      </div>

      {weather.loading && weather.data.location && (
        <div className="flex flex-col justify-center items-center py-16">
          <div className="flex flex-col justify-center items-center">
            <span className="text-2xl text-white">
              {" "}
              {`${weather.data.location.name}, ${weather.data.location.region}, ${weather.data.location.country}`}{" "}
            </span>
            <span className="text-white">
              {weather.data.location.localtime}
            </span>
          </div>

          <div className="my-4 py-6 px-12 rounded-lg text-8xl font-bold bg-gray-700 bg-opacity-50  text-white">
            <div>
              <img
                src={weather.data.current.condition.icon}
                alt="weather condition"
              />
            </div>
            <div>
              {isChecked
                ? Math.round(weather.data.current.temp_f)
                : Math.round(weather.data.current.temp_c)}

              <sup>o</sup>
              <span className="px-2">{isChecked ? "F" : "C"}</span>
            </div>
          </div>

          <div className="text-4xl font-bold text-white">
            {weather.data.current.condition.text}
          </div>
        </div>
      )}

      {!weather.loading && weather.error && (
        <div className="text-red-600 bg-yellow-400 p-4 w-fit mx-auto text-4xl font-bold text-center mt-8">
          City Not Found !!
        </div>
      )}
    </div>
  );
}

export default Home;
