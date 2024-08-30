import Navbar from '@/components/navbar'
import Content from '@/components/content'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <Content />
      </main>
    </div>
  )
}

export default App
