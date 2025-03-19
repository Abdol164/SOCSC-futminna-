import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <div className="bg-white min-h-screen w-full flex flex-col-reverse xl:flex-row items-center xl:overflow-hidden py-10 xl:p-0">
      {/* Left Side (Header, Subheading, and Buttons) */}
      <div className="h-full w-full xl:w-1/2 flex flex-col items-center justify-center px-4 sm:px-8 lg:px-16 xl:px-20">
        <div className="flex flex-col items-center gap-6 sm:gap-10 max-w-xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 uppercase font-dm-sans text-center xl:text-left">
            Build a secure, private, and community-driven email platform where
            users have full control over data and identity.
          </h1>
          <p className="text-base sm:text-lg text-gray-600 text-center xl:text-left">
            SuiMail is designed to provide end-to-end encryption, token-based
            incentives, and self-sovereign identity, ensuring users are in
            charge of their own information and communications in a
            decentralized environment.
          </p>
          
          {/* Button Container */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-4 sm:gap-6 mt-2">
            <Link
              to="/CreateAccount"
              className="bg-[#4BA2FF] py-2 px-4 rounded-md hover:shadow-md duration-300 w-full sm:w-auto text-center"
            >
              <span className="text-white font-medium">Create New Account</span>
            </Link>
            <Link
              to="/auth/login"
              className="group hover:bg-[#4BA2FF] duration-300 py-2 px-4 rounded-md hover:shadow-md w-full sm:w-auto text-center border border-[#4BA2FF] mt-2 sm:mt-0"
            >
              <span className="text-[#4BA2FF] group-hover:no-underline group-hover:text-white duration-300">
                I already have an account
              </span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Right Side (Logo) */}
      <div className="w-full xl:w-1/2 flex items-center justify-center py-6 sm:py-10 xl:p-0">
        <img
          src="/png/suimail-index-logo.png"
          alt="SuiMail Logo"
          className="max-w-[150px] sm:max-w-[200px] md:max-w-[300px] xl:max-w-[500px] w-full"
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default HomePage;