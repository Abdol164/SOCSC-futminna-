import React from 'react'
import { FaXTwitter, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa6"

const ContactPage: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16 px-4 text-center shadow-lg rounded-b-3xl">
        <p className="text-sm uppercase mb-2 tracking-widest font-semibold">Contact us</p>
        <h1 className="text-3xl font-extrabold sm:text-4xl drop-shadow-lg">
          We’d love to hear from you
        </h1>
        <p className="mt-2 text-base text-white/80 max-w-xl mx-auto">
          Our friendly team is always here to chat.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          {
            icon: <FaXTwitter className="text-blue-500 bg-blue-100 rounded-full p-2 w-12 h-12 shadow" />,
            title: 'Chat on X',
            desc: 'Send us a message via X (Twitter)',
            contact: '@socscfutminna',
          },
          {
            icon: <FaEnvelope className="text-pink-500 bg-pink-100 rounded-full p-2 w-12 h-12 shadow" />,
            title: 'Chat to support',
            desc: 'We’re here to help.',
            contact: 'socscfutminna@gmail.com',
          },
          {
            icon: <FaMapMarkerAlt className="text-green-600 bg-green-100 rounded-full p-2 w-12 h-12 shadow" />,
            title: 'Visit us',
            desc: 'Visit our office H2.',
            contact: 'Address',
          },
          {
            icon: <FaPhoneAlt className="text-yellow-600 bg-yellow-100 rounded-full p-2 w-12 h-12 shadow" />,
            title: 'Call us',
            desc: 'Mon-Fri from 8am to 5pm.',
            contact: '+234 810 000 0000',
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition flex flex-col items-center text-center border border-gray-100"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{item.desc}</p>
            <p className="font-medium text-blue-600">{item.contact}</p>
          </div>
        ))}
      </section>

      <section className="bg-blue-50 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider">For Idea</p>
          <h2 className="text-2xl md:text-3xl font-extrabold mt-2 mb-2">Have a project idea?</h2>
          <p className="text-gray-600 mb-6">We’d love to hear your idea. Let us know below.</p>

          <form className="mt-8 space-y-6 text-left bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                className="p-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 w-full transition"
              />
              <input
                type="text"
                placeholder="@x_handle"
                className="p-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 w-full transition"
              />
            </div>
            <input
              type="tel"
              placeholder="+234 800 000 0000"
              className="p-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 w-full transition"
            />
            <textarea
              placeholder="Leave us a message..."
              className="p-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 w-full h-32 transition"
            />
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center px-8 py-6 bg-blue-50 text-blue-600 rounded-lg border-2 border-dashed border-blue-300 cursor-pointer w-full text-center hover:bg-blue-100 transition">
                <span className="text-base font-medium mb-1">Click to upload or drag and drop</span>
                <span className="text-xs text-gray-400">SVG, PNG, JPG or GIF (max. 800x400px)</span>
                <input type="file" className="hidden" />
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold text-lg shadow hover:from-blue-700 hover:to-indigo-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
