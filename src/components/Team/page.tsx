import Navbar from '../Herosection/Navbar'
import TeamsHero from './Hero'
import Footer from '../Innovation/Footer'
import TeamCategories from './Team-Categories'
import TechnicalTeams from './Tech-Teams'
import LeadershipGrid from './Leadership-grid'

const TeamPage = () => {
  return (
    <div className="">
      <Navbar />
      <TeamsHero />

      <TeamCategories />
      <TechnicalTeams />
      <LeadershipGrid />
      <Footer />
    </div>
  )
}

export default TeamPage
