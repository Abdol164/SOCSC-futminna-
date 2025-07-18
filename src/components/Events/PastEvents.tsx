import React, { useState } from 'react'

const eventImages = [
  'Gk-LcPjWgAAna3Z.png',
  'Gk-NsKHXYAAC3zM.png',
  'Gk-NsKLWwAEF5_3 (1).png',
  'Gk-NsKLWwAEF5_3 (2).png',
  'Gk-NsKLWwAEF5_3 (3).png',
  'Gk-NsKLWwAEF5_3.png',
  'Gma3bN4WMAAMLPK.png',
  'GmcFyWea8AIfrP7 (1).png',
  'GmcFyWea8AIfrP7.png',
  'GmkCGaqaEAEkvST.png',
  'GmkCHKVa0AACF0P.png',
  'Gn8Z8nGXAAEhmFF.png',
  'GoWfRPWWsAAgm4i.png',
  'GqKyXcWWAAAURlE (1).png',
  'GqKyXcWWAAAURlE.png',
  'GqLA_4kWIAA889N.png',
  'GqQIJ9uWUAAm3_k.png',
]

// Helper to chunk images into groups
function chunkArray(arr: string[], size: number): string[][] {
  const res: string[][] = []
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size))
  }
  return res
}

const groups = chunkArray(eventImages, 5).slice(0, 4) // 4 groups, 5 images each

const groupLayouts = [
  // Each group has a different layout pattern
  [
    'col-span-2 row-span-2 h-64 sm:h-80 md:h-96',
    'col-span-1 row-span-1 h-32 sm:h-40 md:h-48',
    'col-span-1 row-span-2 h-64 sm:h-80 md:h-96',
    'col-span-1 row-span-1 h-32 sm:h-40 md:h-48',
    'col-span-1 row-span-1 h-32 sm:h-40 md:h-48',
  ],
  [
    'col-span-1 row-span-2 h-64 sm:h-80 md:h-96',
    'col-span-2 row-span-2 h-64 sm:h-80 md:h-96',
    'col-span-1 row-span-1 h-32 sm:h-40 md:h-48',
    'col-span-1 row-span-1 h-32 sm:h-40 md:h-48',
    'col-span-1 row-span-1 h-32 sm:h-40 md:h-48',
  ],
  [
    'col-span-1 row-span-1 h-32 sm:h-40 md:h-48',
    'col-span-1 row-span-2 h-64 sm:h-80 md:h-96',
    'col-span-2 row-span-2 h-64 sm:h-80 md:h-96',
    'col-span-1 row-span-1 h-32 sm:h-40 md:h-48',
    'col-span-1 row-span-1 h-32 sm:h-40 md:h-48',
  ],
  [
    'col-span-1 row-span-1 h-32 sm:h-40 md:h-48',
    'col-span-1 row-span-1 h-32 sm:h-40 md:h-48',
    'col-span-1 row-span-2 h-64 sm:h-80 md:h-96',
    'col-span-2 row-span-2 h-64 sm:h-80 md:h-96',
    'col-span-1 row-span-1 h-32 sm:h-40 md:h-48',
  ],
]

const PastEventsGallery: React.FC = () => {
  const [viewImg, setViewImg] = useState<string | null>(null)

  return (
    <section className="bg-[#edf4ff] py-14 px-2 sm:px-4">
      <h3 className="text-center text-2xl font-semibold mb-6">
        Past Events Gallery
      </h3>
      <div className="flex flex-col gap-8 max-w-6xl mx-auto">
        {groups.map((group, groupIdx) => (
          <div
            key={groupIdx}
            className="grid grid-cols-5 auto-rows-[minmax(2rem,auto)] gap-2 sm:gap-4 md:gap-6 items-stretch"
          >
            {group.map((img: string, idx: number) => (
              <div
                key={img}
                className={`relative group overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer ${groupLayouts[groupIdx][idx]}`}
                onClick={() => setViewImg(`/Events/${img}`)}
              >
                <img
                  src={`/Events/${img}`}
                  alt={`Past Event ${groupIdx * 5 + idx + 1}`}
                  className="rounded-lg object-cover w-full h-full shadow-md group-hover:brightness-110 group-hover:scale-110 transition-all duration-500"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Image Viewer Modal */}
      {viewImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fadeIn"
          onClick={() => setViewImg(null)}
        >
          <div
            className="relative max-w-3xl w-full p-4 animate-zoomIn"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={viewImg}
              alt="Event Large View"
              className="rounded-2xl w-full h-auto max-h-[80vh] shadow-2xl border-4 border-white animate-popIn"
            />
            <button
              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition"
              onClick={() => setViewImg(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      {/* Animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.3s; }
        @keyframes zoomIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-zoomIn { animation: zoomIn 0.3s; }
        @keyframes popIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-popIn { animation: popIn 0.4s; }
      `}</style>
    </section>
  )
}

export default PastEventsGallery
