import React from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Heart className="text-purple-600" size={32} />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
            MindWell
          </span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/forum" className="text-gray-600 hover:text-purple-600 transition-colors">Forum</Link></li>
            <li><Link to="/search" className="text-gray-600 hover:text-purple-600 transition-colors">Find Help</Link></li>
            <li><Link to="/journal" className="text-gray-600 hover:text-purple-600 transition-colors">Journal</Link></li>
            <li><Link to="/resources" className="text-gray-600 hover:text-purple-600 transition-colors">Resources</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header