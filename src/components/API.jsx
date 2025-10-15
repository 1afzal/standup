import React, { useEffect, useState } from "react";
import Landing from "./Landing";
import { motion, AnimatePresence } from "framer-motion"; // npm install framer-motion

function API() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch joke without page reload
  async function getData() {
    try {
      const response = await fetch("https://sv443.net/jokeapi/v2/joke/Dark");
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-red-500 text-xl">
        Error loading joke 😢
      </div>
    );

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* 🌄 Background Image */}
      <Landing />

      {/* 🃏 Joke Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white text-center px-4 sm:px-6 md:px-10 lg:px-20">
        <AnimatePresence mode="wait">
          {data && (
            <motion.ul
              key={data.id || data.joke || data.setup}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              {data.type === "single" ? (
                <li className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold drop-shadow-md leading-relaxed">
                  {data.joke}
                </li>
              ) : (
                <>
                  <li className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold drop-shadow-md leading-relaxed">
                    {data.setup}
                  </li>
                  <li className="text-md sm:text-lg md:text-xl lg:text-2xl mt-3 opacity-90">
                    {data.delivery}
                  </li>
                </>
              )}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* 🔘 Button */}
        <button
          onClick={getData}
          className="mt-8 px-2 py-1 sm:px-6 sm:py-3 bg-black hover:bg-gray-900 rounded-xl text-sm sm:text-base md:text-md text-white font-semibold shadow-lg transition-all duration-300 active:scale-95"
        >
          Generate
        </button>
      </div>
    </div>
  );
}

export default API;
