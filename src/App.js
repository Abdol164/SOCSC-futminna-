// import { useRef, useEffect } from 'react';

// const containerRef = useRef(null);

// useEffect(() => {
//   const container = containerRef.current;
//   const images = container.children;

//   const scrollWidth = container.scrollWidth;
//   const clientWidth = container.clientWidth;

//   const scrollPosition = container.scrollLeft;

//   const infiniteScroll = () => {
//     if (scrollPosition + clientWidth >= scrollWidth) {
//       // Append new images to the end of the container
//       const newImages = Array(20).fill(null).map((_, index) => (
//         <img
//           key={index}
//           src="/png/avatar.png"
//           alt={`Image ${index + 1}`}
//           className="w-15 h-12 rounded-full"
//         />
//       ));
//       container.appendChild(newImages);
//       // Reset the scroll position to the beginning
//       container.scrollLeft = 0;
//     }
//   };

//   container.addEventListener('scroll', infiniteScroll);

//   return () => {
//     container.removeEventListener('scroll', infiniteScroll);
//   };
// }, [containerRef]);