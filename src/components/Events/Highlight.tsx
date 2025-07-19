const HighlightBanner = () => {
  return (
    <section className="bg-gradient-to-b from-[#011632] to-[#3023AE] py-10 px-6 flex flex-col items-center">
      <h2 className="text-white text-2xl font-bold mb-6">Highlight</h2>
      <div className="flex justify-center w-full">
        <img
          src="/img/About-1.png"
          alt="Highlight"
          className="w-full max-w-3xl h-40 md:h-56 lg:h-64 object-cover rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default HighlightBanner;
