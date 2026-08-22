import SmoothScroll from '@/components/smooth-scroll'
import CustomCursor from '@/components/custom-cursor'
import Preloader from '@/components/preloader'
import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import About from '@/components/about'
import Stats from '@/components/stats'
import Platforms from '@/components/platforms'
import ContentArchive from '@/components/content-archive'
import Featured from '@/components/featured'
import Community from '@/components/community'
import SiteFooter from '@/components/site-footer'

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <Preloader />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Stats />
        <Platforms />
        <ContentArchive />
        <Featured />
        <Community />
      </main>
      <SiteFooter />
    </>
  )
}
