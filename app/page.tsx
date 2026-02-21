import Documentary from "./_components/documentary/Documentary";
import LatestRelease from "./_components/latestRelease/LatestRelease";
import Contact from "./_components/pageComponents/contact/Contact";
import Events from "./_components/pageComponents/events/Events";
import HeroSlider from "./_components/pageComponents/heroSlider/HeroSlider";
import History from "./_components/pageComponents/history/History";
import Members from "./_components/pageComponents/members/Members";
import MusicPlayer from "./_components/pageComponents/musicPlayer/MusicPlayer";
import News from "./_components/pageComponents/news/News";



export default function Home() {
  return (
    <div className="">
      <HeroSlider />
      <MusicPlayer />
      <History />
      <Members />
      <Documentary />
      <LatestRelease />
      <Events />
      {/* <News /> */}
      <Contact />
    </div>
  );
}
