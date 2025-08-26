const HighlightBanner = () => {
  return (
    <section className="bg-gradient-to-b from-[#011632] to-[#3023AE] py-10 px-1 flex flex-col items-center">
      <div className="relative w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden border-2 border-blue-900">
        <img
          src="/img/Suioncampus-group.jpg"
          alt="Highlight"
          loading="lazy"
          width={1200}
          height={320}
          className="w-full h-48 md:h-72 lg:h-[20rem] object-cover"
          decoding="async"
          style={{ backgroundColor: "#e0e7ef" }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        {/* Centered Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-white text-4xl md:text-5xl font-extrabold drop-shadow-lg mb-4">
            Community Highlight
          </h2>
          <p className="text-gray-100 text-lg md:text-2xl max-w-2xl drop-shadow">
            Celebrating our vibrant community of builders, innovators, and creators at Sui on Campus FUT Minna.
          </p>
        </div>
      </div>
    </section>
  )
};

export default HighlightBanner;
