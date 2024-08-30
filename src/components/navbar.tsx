import { FileText, Home, Info } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold">PDF Splitter</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-muted-foreground hover:text-primary cursor-pointer">
              <Home className="size-5" />
            </div>
            <div className="text-muted-foreground hover:text-primary cursor-pointer">
              <Info className="size-5" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
