import React, { useState } from 'react'
import { Book, Video, FileText, ExternalLink } from 'lucide-react'

interface Resource {
  id: number
  title: string
  type: 'article' | 'video' | 'book'
  description: string
  link: string
}

const sampleResources: Resource[] = [
  {
    id: 1,
    title: "Understanding Anxiety: Causes, Symptoms, and Treatment",
    type: "article",
    description: "A comprehensive guide to anxiety disorders, their causes, and various treatment options.",
    link: "https://example.com/anxiety-guide"
  },
  {
    id: 2,
    title: "Mindfulness Meditation for Stress Reduction",
    type: "video",
    description: "A 15-minute guided meditation video to help reduce stress and promote relaxation.",
    link: "https://example.com/mindfulness-video"
  },
  {
    id: 3,
    title: "The Power of Vulnerability by Brené Brown",
    type: "book",
    description: "A transformative book about embracing vulnerability and living wholeheartedly.",
    link: "https://example.com/vulnerability-book"
  },
  // Add more sample resources as needed
]

const Resources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>(sampleResources)
  const [filter, setFilter] = useState<'all' | 'article' | 'video' | 'book'>('all')

  const filteredResources = filter === 'all' ? resources : resources.filter(resource => resource.type === filter)

  const ResourceIcon: React.FC<{ type: Resource['type'] }> = ({ type }) => {
    switch (type) {
      case 'article':
        return <FileText className="text-blue-500" size={24} />
      case 'video':
        return <Video className="text-red-500" size={24} />
      case 'book':
        return <Book className="text-green-500" size={24} />
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4">Mental Health Resources</h1>
      
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('article')}
          className={`px-4 py-2 rounded-full ${filter === 'article' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Articles
        </button>
        <button
          onClick={() => setFilter('video')}
          className={`px-4 py-2 rounded-full ${filter === 'video' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Videos
        </button>
        <button
          onClick={() => setFilter('book')}
          className={`px-4 py-2 rounded-full ${filter === 'book' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Books
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col">
            <div className="flex items-center space-x-3 mb-4">
              <ResourceIcon type={resource.type} />
              <h3 className="text-xl font-semibold">{resource.title}</h3>
            </div>
            <p className="text-gray-600 mb-4 flex-grow">{resource.description}</p>
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-purple-600 hover:text-purple-800 font-medium"
            >
              Learn More
              <ExternalLink size={16} className="ml-1" />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Resources