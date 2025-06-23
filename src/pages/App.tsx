import Divider from '../components/atoms/Divider'
import TopBar from '../components/layout/TopBar'
import BrandingSection from '../components/molecules/BrandingSection'
import AnalysisSection from '../components/organisms/AnalysisSection'

function App() {

  return (
    <div className='flex flex-col w-full h-screen gap-20 mb-70'>
      <TopBar />
      <div className='flex flex-col gap-16 px-30 max-w-[1800px] mx-auto'>
        <BrandingSection />
        <Divider />
        <AnalysisSection />
      </div>
    </div>
  )
}

export default App
