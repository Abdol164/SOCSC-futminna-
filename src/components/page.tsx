import Navbar from './Herosection/Navbar'
import Hero from './Herosection/Hero'
import Stats from './Herosection/stats'
import CommunitySection from './CommunitySection'
import TeamSection from './Teamsection'
import InnovationSection from './Innovation/Footer'
const HeroSection = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <Stats />
      <CommunitySection />
      <TeamSection />
      <InnovationSection />
    </div>
  )
}

export default HeroSection
