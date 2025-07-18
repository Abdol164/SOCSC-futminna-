import Hero from './Hero'
import ProjectGrid from './Projects-Grid'
import Navbar from '../Herosection/Navbar'
import InnovationSection from '../Innovation/Footer'
import ProjectSpotlight from './Project-Spotlight'

const Projects = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ProjectGrid />
      <ProjectSpotlight />
      <InnovationSection />
    </>
  )
}

export default Projects
