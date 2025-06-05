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
  VolumeUp,
  Bookmark,
  Share
} from '@mui/icons-material';

const audioData = [
  {
    id: '1',
    title: 'The Rise of AI',
    description: 'Exploring how AI is transforming industries and reshaping the future of work across multiple sectors.',
    podcaster: 'Jane Doe',
    src: '/audio/episode1.mp3',
    duration: '45:32',
    date: '2025-01-15',
    played: false
  },
  {
    id: '2',
    title: 'Machine Learning Basics',
    description: 'An introduction to ML techniques and applications for beginners starting their AI journey.',
    podcaster: 'John Smith',
    src: '/audio/episode2.mp3',
    duration: '38:15',
    date: '2025-01-10',
    played: true
  },
  {
    id: '3',
    title: 'Deep Learning Revolution',
    description: 'Understanding neural networks and their profound impact on modern artificial intelligence systems.',
    podcaster: 'Dr. Sarah Johnson',
    src: '/audio/episode3.mp3',
    duration: '52:20',
    date: '2025-01-20',
    played: false
  },
  {
    id: '4',
    title: 'AI Ethics and Society',
    description: 'Discussing the critical ethical implications of artificial intelligence in our modern society.',
    podcaster: 'Prof. Michael Brown',
    src: '/audio/episode4.mp3',
    duration: '41:45',
    date: '2025-01-05',
    played: true
  },
  {
    id: '5',
    title: 'Computer Vision Breakthrough',
    description: 'Latest advances in computer vision technology and real-world applications.',
    podcaster: 'Dr. Lisa Chen',
    src: '/audio/episode5.mp3',
    duration: '47:30',
    date: '2025-01-25',
    played: false
  }
];

function Header({ onSearch, onSubscribe, showBackButton, onBack }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

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
                <Home className="text-2xl" />
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
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full font-semibold transition-colors flex items-center space-x-2"
          >
            <Notifications />
            <span>Subscribe</span>
          </button>
        </div>
        
        {!showBackButton && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search episodes..."
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

function FilterSortControls({ filter, setFilter, sortBy, setSortBy, sortOrder, setSortOrder }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border dark:border-gray-700 mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <FilterList className="text-gray-600 dark:text-gray-400" />
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="all">All Episodes</option>
            <option value="played">Played</option>
            <option value="unplayed">New/Unplayed</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Sort className="text-gray-600 dark:text-gray-400" />
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="podcaster">Sort by Podcaster</option>
          </select>
        </div>
        
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
        </button>
      </div>
    </div>
  );
}

function HomePage({ onSelectEpisode, searchTerm, onSearch, playedEpisodes, setPlayedEpisodes }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSubscribe = () => {
    alert('Thanks for subscribing! You\'ll receive notifications for new episodes.');
  };

  const filteredAndSortedEpisodes = audioData
    .filter(episode => {
      const matchesSearch = episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           episode.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           episode.podcaster.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filter === 'all' || 
                           (filter === 'played' && (episode.played || playedEpisodes.has(episode.id))) ||
                           (filter === 'unplayed' && !(episode.played || playedEpisodes.has(episode.id)));
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let compareValue = 0;
      
      if (sortBy === 'date') {
        compareValue = new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'title') {
        compareValue = a.title.localeCompare(b.title);
      } else if (sortBy === 'podcaster') {
        compareValue = a.podcaster.localeCompare(b.podcaster);
      }
      
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

  const handleEpisodeClick = (episode) => {
    setPlayedEpisodes(prev => new Set([...prev, episode.id]));
    onSelectEpisode(episode);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onSearch={onSearch} onSubscribe={handleSubscribe} />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Latest Episodes
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Discover the latest in AI and Machine Learning
          </p>
        </div>

        <FilterSortControls 
          filter={filter} 
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        <div className="space-y-4">
          {filteredAndSortedEpisodes.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p className="text-xl">No episodes found</p>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredAndSortedEpisodes.map(episode => (
              <div 
                key={episode.id} 
                onClick={() => handleEpisodeClick(episode)}
                className="block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {episode.title}
                      </h3>
                      {!(episode.played || playedEpisodes.has(episode.id)) && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {episode.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>Hosted by {episode.podcaster}</span>
                      <span>•</span>
                      <span>{episode.duration}</span>
                      <span>•</span>
                      <span>{new Date(episode.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-col items-center">
                    <PlayArrow className="text-blue-500 text-3xl mb-2" />
                    {(episode.played || playedEpisodes.has(episode.id)) && (
                      <span className="text-xs text-green-600 font-medium">PLAYED</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

function EpisodePage({ episode, onBack }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const handleSubscribe = () => {
    alert('Thanks for subscribing! You\'ll receive notifications for new episodes.');
  };

  useEffect(() => {
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      audio.volume = volume;
      
      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, [audio, volume]);

  const playAudio = () => {
    if (!audio) {
      const newAudio = new Audio(episode.src);
      setAudio(newAudio);
      newAudio.play().catch(e => console.log('Audio play failed - using demo mode'));
    } else {
      audio.play().catch(e => console.log('Audio play failed - using demo mode'));
    }
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    if (audio) audio.pause();
    setIsPlaying(false);
  };

  const stopAudio = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const skipForward = () => {
    if (audio) {
      audio.currentTime = Math.min(audio.currentTime + 15, duration);
    }
  };

  const skipBackward = () => {
    if (audio) {
      audio.currentTime = Math.max(audio.currentTime - 15, 0);
    }
  };

  const handleProgressClick = (e) => {
    if (audio && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      audio.currentTime = percent * duration;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        onSubscribe={handleSubscribe} 
        showBackButton={true} 
        onBack={onBack}
      />

      <div className="max-w-4xl mx-auto p-6">
        {/* Episode Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              {episode.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              {episode.description}
            </p>
            <div className="flex justify-center items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span>Hosted by {episode.podcaster}</span>
              <span>•</span>
              <span>{episode.duration}</span>
              <span>•</span>
              <span>{new Date(episode.date).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Audio Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration || 0)}</span>
            </div>
            <div 
              className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 cursor-pointer"
              onClick={handleProgressClick}
            >
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
              ></div>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="flex justify-center items-center space-x-6 mb-6">
            <button 
              onClick={skipBackward}
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <SkipPrevious className="text-2xl text-gray-600 dark:text-gray-400" />
            </button>
            
            {isPlaying ? (
              <button 
                onClick={pauseAudio}
                className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
              >
                <Pause className="text-3xl" />
              </button>
            ) : (
              <button 
                onClick={playAudio}
                className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
              >
                <PlayArrow className="text-3xl" />
              </button>
            )}
            
            <button 
              onClick={skipForward}
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <SkipNext className="text-2xl text-gray-600 dark:text-gray-400" />
            </button>
            
            <button 
              onClick={stopAudio}
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <Delete className="text-2xl text-red-500" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex justify-center items-center space-x-4">
            <VolumeUp className="text-gray-600 dark:text-gray-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-32"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>

        {/* Episode Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <Bookmark className="text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Save for Later</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <Share className="text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Share Episode</span>
            </button>
          </div>
        </div>

        {/* Episode Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            About This Episode
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              In this comprehensive episode, we explore {episode.title.toLowerCase()}. 
              Host {episode.podcaster} brings years of expertise to discuss the nuances and implications 
              of this fascinating topic. Whether you're a beginner or an expert in AI and machine learning, 
              this episode provides valuable insights and practical knowledge that you can apply in your 
              own projects and understanding of the field.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              Join us as we delve into real-world applications, current research, and future possibilities 
              in the ever-evolving landscape of artificial intelligence and machine learning.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <p className="mb-4 text-lg">Follow us on social media</p>
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="hover:text-blue-400 transition-colors">
            <Facebook className="text-2xl" />
          </a>
          <a href="#" className="hover:text-pink-400 transition-colors">
            <Instagram className="text-2xl" />
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors">
            <Twitter className="text-2xl" />
          </a>
        </div>
        <p className="text-sm text-gray-400">
          &copy; 2025 AI/ML Podcast. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [playedEpisodes, setPlayedEpisodes] = useState(new Set(['2', '4'])); // Pre-mark some as played

  const handleSelectEpisode = (episode) => {
    setSelectedEpisode(episode);
    setCurrentPage('episode');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedEpisode(null);
  };

  if (currentPage === 'episode' && selectedEpisode) {
    return (
      <EpisodePage 
        episode={selectedEpisode} 
        onBack={handleBackToHome}
      />
    );
  }

  return (
    <HomePage 
      onSelectEpisode={handleSelectEpisode}
      searchTerm={searchTerm}
      onSearch={setSearchTerm}
      playedEpisodes={playedEpisodes}
      setPlayedEpisodes={setPlayedEpisodes}
    />
  );
}