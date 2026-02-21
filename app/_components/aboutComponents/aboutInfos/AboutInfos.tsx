import LatestRelease from "../../latestRelease/LatestRelease"
import BandBio from "../bandBio/BandBio"
import { HeroSection } from "../heroSection/HeroSection"
import MembersSection from "../membersSection/MembersSection"



const AboutInfos = () => {
  return (
    <div className="">
        <HeroSection />
        <BandBio />
        <LatestRelease />
        <MembersSection />
        
    </div>
  )
}

export default AboutInfos