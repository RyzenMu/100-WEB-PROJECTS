import { useState, useEffect } from 'react';
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  Delete,
  Facebook,
  Instagram,
  Twitter,
  Home,
  Search,
  FilterList,
  Sort,
  Notifications,
  Mic,
  ArrowBack,
} from '@mui/icons-material';
import { duration } from '@mui/material';

const audioData = [
  {
    id: '1',
    title: 'Rise of AI',
    description:
      'Exploring how AI is trasforming indutries and reshaping the future of work across multiple sectors',
    podcaster: 'John Doe',
    src: '/audio/episode1.mp3',
    duration: '45:32',
    date: '2025-01-15',
    played: false,
  },
  {
    id: '2',
    title: 'Machine Learning Basics',
    description:
      'An iintroduction to ML techniques, and applications for beginners starting their AI journey',
    podcaster: 'John Smith',
    src: '/audio/episode2.mp3',
    duration: '52:20',
    date: '2025-01-20',
    played: false,
  },
  {
    id: '3',
    title: 'Deep Learning Revolution',
    description:
      'Understanding nerual networks and their profound impact on modern artificial intelligence systems',
    podcaster: 'Dr. Sarah Johnson',
    src: '/audio/episode3.mp3',
    duration: '38:15',
    date: '2025-01-10',
    played: false,
  },
  {
    id: '4',
    title: 'AI Ethics and society',
    description:
      'Discussing the critical ethical implications of artificial intelligence in our moern society',
    podcaster: 'Prof. Micheal Brown',
    src: 'audio/episode4.mp3',
    duartion: '41:40',
    date: '2025-01-05',
    played: false,
  },
  {
    id: '5',
    title: 'Computer Vision Breakthrough',
    description: 'Latest advances in computer vision technology and real world applications',
    podcaster: 'Dr. Lisa Sen',
    src: '/audio/episode5.mp3',
    duration: '47:30',
    date: '2025-01-25',
    played: false,
  },
];

export default function App() {
  const [filter, setFilter] = useState('all');
  return (
    <div>      
      <HomePage filter={filter} onSetFilter={setFilter}/>
    </div>
  );
}

function Header({ showBackButton, onBack, onSubscribe }) {
  const [searchTerm, setSearchTerm] = useState('');
  function handleSearch() {}
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {showBackButton && (
              <button
                onClick={onBack}
                className="hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                slow
              </button>
            )}
            <div className="bg-white p-2 rounded-full">
              <Mic className="text-blue-600 text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI/ML Podcast</h1>
              <p className="text-blue-100">Artificial Intelligence & Machine Learning</p>
            </div>
          </div>

          <button
            onClick={onSubscribe}
            className="bg-red-400 hover:bg-red-700 px-6 py-2 rounded-full font-semibold transition-colors flex items-center space-x-2"
          >
            <span>Notification</span>

            <span>Subscribe</span>
          </button>
        </div>
        {!showBackButton && (
          <div>
            <p>search</p>
            <input
              type="text"
              placeholder="Search episodes ..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
        )}
      </div>
    </header>
  );
}

function FilterSortControls({filter, onSetFilter, sortBy, setSortBy, sortOrder, setSortOrder}) {
  return (
    <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border dark:border-gray-700 mb-6'>
      <div className='flex flex-wrap gap-4 items-center'>
        <div className='flex items-center space-x-2'>
          <p className='text-gray-600 dark:text-gray-600'>Filter List</p>
          <select
          value={filter}
          onChange={(e)=>onSetFilter(e.target.value)}
          className='border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white' >
            <option value='all'>All Episodes</option>
            <option value='played'>Played</option>
            <option value='unplayed'>New/Unplayed</option>
          </select>
        </div>
        <div className='flex items-center space-x-2'>
          <p>Sort</p>
          <select
          value={sortBy}
          onChange={(e)=> setSortBy(e.target.value)}
          className='border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="podcaster">Sort by Podcaster</option>
          </select>
        </div>
        <button
        onClick={()=> setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        className='px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
        >
            {sortOrder === 'asc' ? '⬆️ Ascending' : '⬇️ Descending'}
        </button>
      </div>
    </div>
  );
}

function HomePage(){
  return (
    <div>
      <Header showBackButton={false} />
      <FilterSortControls filter={filter} onSetFilter={onSetFilter}/>
    </div>
  )
}
