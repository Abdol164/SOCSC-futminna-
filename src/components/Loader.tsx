import React, { useEffect, useState } from "react";
// import icon from "../assets/sui_loader_icon.svg";

const Loader = () => {
  const fullText = "SOCSCFutminna";
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typing = setInterval(() => {
      setText((prev) => prev + fullText[index]);
      setIndex((prev) => prev + 1);
    }, 200);

    if (index === fullText.length) clearInterval(typing);

    return () => clearInterval(typing);
  }, [index]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900 space-y-6">
      <div className="animate-spin-slow bg-gradient-to-tr from-indigo-500/30 via-purple-500/40 to-indigo-700/30 p-4 rounded-full">
        {/* <img
          src={icon}
          alt="Sui Loader Icon"
          className="w-20 h-20 drop-shadow-[0_0_12px_rgba(99,102,241,0.7)]"
        /> */}
      </div>
      <div className="text-purple-200 font-mono text-lg tracking-widest animate-pulse">
        {text}
        <span className="animate-blink">|</span>
      </div>
    </div>
  );
};

export default Loader;
