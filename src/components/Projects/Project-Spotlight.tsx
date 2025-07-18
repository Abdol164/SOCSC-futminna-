import React from 'react'

const ProjectSpotlight = () => {
  return (
    <section className="bg-[#F4F8FF] py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-blue-600 text-sm font-semibold mb-2">
            Project Spotlight
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            PAYFRICA
          </h2>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet. Et iure tenetur et autem internos qui
            dolor totam qui libero distinctio et ullam accusamus. Est omnis
            consequatur aut odit voluptas est tempore illum?
          </p>
          <ul className="text-gray-700 list-disc list-inside space-y-2 mb-6">
            <li>Problem Statement (1 paragraph)</li>
            <li>Solution Approach (bullet points)</li>
          </ul>
          <button className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-medium py-2 px-5 rounded transition">
            Read More
          </button>
        </div>

        <div className="grid grid-cols-3 grid-rows-2 gap-4 items-center justify-center">
          <img
            src="/img/Payfrica-Logo.png"
            alt="Pattern"
            className="w-full h-full object-cover col-span-1 row-span-1"
          />
          <img
            src="/img/Payfrica-Icon.png"
            alt="Payfrica Icon"
            className="w-full h-full object-contain col-span-1 row-span-1"
          />
          <div className="col-span-1 row-span-1" />
          <img
            src="/img/Payfrica-Logo.png"
            alt="Payfrica Logo"
            className="w-full h-full object-contain col-span-1 row-span-1"
          />
          <img
            src="/img/Payfrica-1.png"
            alt="Team"
            className="w-full h-full object-cover col-span-1 row-span-1"
          />
          <img
            src="/img/Payfrica.png"
            alt="Group"
            className="w-full h-full object-cover col-span-1 row-span-1"
          />
        </div>
      </div>
    </section>
  )
}

export default ProjectSpotlight
