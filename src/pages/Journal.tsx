import React, { useState } from 'react'
import { Calendar, Smile, Frown, Meh, Edit2, Trash2 } from 'lucide-react'

interface JournalEntry {
  id: number
  date: string
  mood: 'happy' | 'neutral' | 'sad'
  content: string
}

const sampleEntries: JournalEntry[] = [
  {
    id: 1,
    date: '2024-03-15',
    mood: 'happy',
    content: "Today was a great day! I accomplished all my tasks and had a nice dinner with friends."
  },
  {
    id: 2,
    date: '2024-03-14',
    mood: 'neutral',
    content: "An average day. Nothing special happened, but that's okay sometimes."
  },
  // Add more sample entries as needed
]

const Journal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(sampleEntries)
  const [newEntry, setNewEntry] = useState<Omit<JournalEntry, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    mood: 'neutral',
    content: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const entryToAdd = {
      ...newEntry,
      id: entries.length + 1
    }
    setEntries([entryToAdd, ...entries])
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      mood: 'neutral',
      content: ''
    })
  }

  const deleteEntry = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id))
  }

  const MoodIcon: React.FC<{ mood: JournalEntry['mood'] }> = ({ mood }) => {
    switch (mood) {
      case 'happy':
        return <Smile className="text-green-500" />
      case 'sad':
        return <Frown className="text-red-500" />
      default:
        return <Meh className="text-yellow-500" />
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4">Mood Journal</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">New Journal Entry</h2>
        <div className="flex space-x-4 mb-4">
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <div className="relative">
              <input
                type="date"
                value={newEntry.date}
                onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                className="w-full p-2 border rounded pl-10"
                required
              />
              <Calendar className="absolute left-3 top-2 text-gray-400" size={20} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mood</label>
            <select
              value={newEntry.mood}
              onChange={(e) => setNewEntry({ ...newEntry, mood: e.target.value as JournalEntry['mood'] })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="happy">Happy</option>
              <option value="neutral">Neutral</option>
              <option value="sad">Sad</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Journal Entry</label>
          <textarea
            value={newEntry.content}
            onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
            className="w-full p-2 border rounded h-32"
            placeholder="How are you feeling today?"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
          Save Entry
        </button>
      </form>

      <div className="space-y-6">
        {entries.map((entry) => (
          <div key={entry.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <Calendar size={20} className="text-gray-500" />
                <span className="font-medium">{entry.date}</span>
                <MoodIcon mood={entry.mood} />
              </div>
              <div className="space-x-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <Edit2 size={20} />
                </button>
                <button className="text-red-500 hover:text-red-700" onClick={() => deleteEntry(entry.id)}>
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <p className="text-gray-700">{entry.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Journal