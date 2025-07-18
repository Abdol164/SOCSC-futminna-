import HighlightBanner from './Highlight'
import UpcomingEvents from './UpcomingEvents'
import PastEventsGallery from './PastEvents'
import Navbar from '../Herosection/Navbar'
import InnovationSection from '../Innovation/Footer'

const Events = () => {
  return (
    <>
      <Navbar />
      <HighlightBanner />
      <UpcomingEvents />
      <PastEventsGallery />
      <InnovationSection />
    </>
  )
}

export default Events
