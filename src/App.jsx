import Navbar from './components/Navbar'
import Footer from './components/Footer'
import QuizManager from './components/QuizManager'
import Background from './components/Background'

function App() {
  return (
    <>
      {/* our animated background componenet using framer */}
      <Background />
      {/* navbar with logo, title, and link to github project */}
      <Navbar />
      {/* the entire quiz is handled here, progress bar, cards, questions, etc. */}
      <QuizManager />
      {/* the footer with links to github profile and project */}
      <Footer />
    </>
  )
}

export default App
