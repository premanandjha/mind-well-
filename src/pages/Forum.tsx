import React, { useState } from 'react'
import { MessageSquare, ThumbsUp, Flag, Image, Paperclip } from 'lucide-react'

interface Post {
  id: number
  title: string
  content: string
  author: string
  date: string
  likes: number
  replies: number
}

const samplePosts: Post[] = [
  {
    id: 1,
    title: "Coping with Anxiety During Uncertain Times",
    content: "I've been struggling with anxiety lately due to all the uncertainty in the world. Does anyone have any tips or strategies they've found helpful?",
    author: "AnxiousButHopeful",
    date: "2024-03-15",
    likes: 24,
    replies: 8
  },
  {
    id: 2,
    title: "The Importance of Self-Care in Mental Health",
    content: "I wanted to share my experience with implementing a self-care routine and how it's positively impacted my mental health. What are your favorite self-care practices?",
    author: "WellnessWarrior",
    date: "2024-03-14",
    likes: 42,
    replies: 15
  },
  // Add more sample posts as needed
]

const Forum: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(samplePosts)
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault()
    const newPost: Post = {
      id: posts.length + 1,
      title: newPostTitle,
      content: newPostContent,
      author: "Anonymous", // In a real app, this would be the logged-in user
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      replies: 0
    }
    setPosts([newPost, ...posts])
    setNewPostTitle('')
    setNewPostContent('')
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4">Mental Health Forum</h1>
      
      <form onSubmit={handleSubmitPost} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
        <input
          type="text"
          placeholder="Post Title"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <textarea
          placeholder="Share your thoughts..."
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          className="w-full p-2 mb-4 border rounded h-32"
          required
        ></textarea>
        <div className="flex justify-between items-center">
          <div className="space-x-2">
            <button type="button" className="text-gray-500 hover:text-purple-600">
              <Image size={20} />
            </button>
            <button type="button" className="text-gray-500 hover:text-purple-600">
              <Paperclip size={20} />
            </button>
          </div>
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
            Post
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Posted by {post.author} on {post.date}</span>
              <div className="flex space-x-4">
                <button className="flex items-center space-x-1 hover:text-purple-600">
                  <ThumbsUp size={16} />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-purple-600">
                  <MessageSquare size={16} />
                  <span>{post.replies}</span>
                </button>
                <button className="hover:text-red-600">
                  <Flag size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Forum