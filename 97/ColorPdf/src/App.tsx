import React, { useState, useEffect } from 'react';

// Mock Supabase client for demonstration
const mockBooks = [
  {
    id: '1',
    title: 'Introduction to Quantum Mechanics',
    category: 'physics',
    path: 'physics/quantum_mechanics.pdf',
    cover_url: null,
    bookmarked: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Linear Algebra and Its Applications',
    category: 'maths',
    path: 'maths/linear_algebra.pdf',
    cover_url: null,
    bookmarked: false,
    created_at: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    title: 'Deep Learning Fundamentals',
    category: 'ai',
    path: 'ai/deep_learning.pdf',
    cover_url: null,
    bookmarked: true,
    created_at: '2024-01-03T00:00:00Z'
  },
  {
    id: '4',
    title: 'Classical Mechanics: An Introduction',
    category: 'physics',
    path: 'physics/classical_mechanics.pdf',
    cover_url: null,
    bookmarked: false,
    created_at: '2024-01-04T00:00:00Z'
  },
  {
    id: '5',
    title: 'Calculus: Early Transcendentals',
    category: 'maths',
    path: 'maths/calculus.pdf',
    cover_url: null,
    bookmarked: true,
    created_at: '2024-01-05T00:00:00Z'
  },
  {
    id: '6',
    title: 'Machine Learning: A Probabilistic Perspective',
    category: 'ai',
    path: 'ai/machine_learning.pdf',
    cover_url: null,
    bookmarked: false,
    created_at: '2024-01-06T00:00:00Z'
  }
];

// Types
enum Category {
  PHYSICS = 'physics',
  MATHS = 'maths',
  AI = 'ai'
}

interface Book {
  id: string;
  title: string;
  category: Category;
  path: string;
  coverUrl?: string;
  bookmarked: boolean;
  createdAt?: string;
}

enum ViewType {
  GRID = 'grid',
  LIST = 'list'
}

// Icons
const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
  </svg>
);

const Grid = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
  </svg>
);

const List = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="8" x2="21" y1="6" y2="6" />
    <line x1="8" x2="21" y1="12" y2="12" />
    <line x1="8" x2="21" y1="18" y2="18" />
    <line x1="3" x2="3.01" y1="6" y2="6" />
    <line x1="3" x2="3.01" y1="12" y2="12" />
    <line x1="3" x2="3.01" y1="18" y2="18" />
  </svg>
);

const BookOpen = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const Bookmark = ({ className, filled }: { className?: string; filled?: boolean }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
  </svg>
);

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const Science = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5a.5.5 0 00-.5.5v.5c0 .552.448 1 1 1h13c.552 0 1-.448 1-1v-.5a.5.5 0 00-.5-.5l-4.091-4.091a2.25 2.25 0 01-.659-1.591V3.104a.25.25 0 01.25-.25h1.25a.25.25 0 000-.5h-7.5a.25.25 0 000 .5H9.5a.25.25 0 01.25.25z" />
  </svg>
);

const Calculate = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect width="4" height="4" x="3" y="3" rx="1" />
    <rect width="4" height="4" x="17" y="3" rx="1" />
    <rect width="4" height="4" x="3" y="17" rx="1" />
    <rect width="4" height="4" x="17" y="17" rx="1" />
    <line x1="9" x2="15" y1="5" y2="5" />
    <line x1="9" x2="15" y1="12" y2="12" />
    <line x1="9" x2="15" y1="19" y2="19" />
    <line x1="12" x2="12" y1="2" y2="6" />
    <line x1="12" x2="12" y1="10" y2="14" />
    <line x1="12" x2="12" y1="18" y2="22" />
  </svg>
);

const Cpu = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect width="16" height="16" x="4" y="4" rx="2" />
    <rect width="6" height="6" x="9" y="9" rx="1" />
    <path d="M15 2v2M15 20v2M2 15h2M20 15h2M2 9h2M20 9h2M9 2v2M9 20v2" />
  </svg>
);

const ArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 18-6-6 6-6" />
  </svg>
);

const Trash = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

// Book Repository
class BookRepository {
  private books: any[] = [...mockBooks];

  private toBook(dto: any): Book {
    return {
      id: dto.id,
      title: dto.title,
      category: dto.category.toUpperCase() as Category,
      path: dto.path,
      coverUrl: dto.cover_url,
      bookmarked: dto.bookmarked,
      createdAt: dto.created_at
    };
  }

  async listBooks(): Promise<Book[]> {
    return this.books.map(dto => this.toBook(dto));
  }

  async searchBooks(query: string, category?: Category): Promise<Book[]> {
    let result = [...this.books];

    if (category) {
      result = result.filter(book => book.category === category.toLowerCase());
    }

    if (query) {
      result = result.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    return result.map(dto => this.toBook(dto));
  }

  async uploadBook(title: string, category: Category, file: File): Promise<Book> {
    const sanitizedTitle = title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
    const path = `${category.toLowerCase()}/${sanitizedTitle}_${Date.now()}.pdf`;

    const newBook = {
      id: Date.now().toString(),
      title,
      category: category.toLowerCase(),
      path,
      cover_url: null,
      bookmarked: false,
      created_at: new Date().toISOString()
    };
    
    // Add to the beginning of the array
    this.books.unshift(newBook);
    
    return this.toBook(newBook);
  }

  async updateBookmark(bookId: string, bookmarked: boolean): Promise<Book> {
    const bookIndex = this.books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
      this.books[bookIndex] = { ...this.books[bookIndex], bookmarked };
      return this.toBook(this.books[bookIndex]);
    }
    throw new Error('Book not found');
  }

  async deleteBook(bookId: string): Promise<void> {
    const bookIndex = this.books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
      this.books.splice(bookIndex, 1);
    } else {
      throw new Error('Book not found');
    }
  }

  getPublicUrl(path: string): string {
    return `https://example.com/storage/${path}`;
  }
}

// Main Component
const PDFLibraryApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'viewer'>('home');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.GRID);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: Category.PHYSICS,
    file: null as File | null,
    uploading: false
  });

  const bookRepo = new BookRepository();

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    if (query || selectedCategory) {
      searchBooks();
    } else {
      loadBooks();
    }
  }, [query, selectedCategory]);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const bookList = await bookRepo.listBooks();
      setBooks(bookList);
    } catch (error) {
      console.error('Failed to load books:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchBooks = async () => {
    try {
      const results = await bookRepo.searchBooks(query, selectedCategory || undefined);
      setBooks(results);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.file || !uploadForm.title) return;

    setUploadForm(prev => ({ ...prev, uploading: true }));
    try {
      const newBook = await bookRepo.uploadBook(uploadForm.title, uploadForm.category, uploadForm.file);
      setBooks(prev => [newBook, ...prev]);
      setShowUpload(false);
      setUploadForm({
        title: '',
        category: Category.PHYSICS,
        file: null,
        uploading: false
      });
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploadForm(prev => ({ ...prev, uploading: false }));
    }
  };

  const handleBookmarkToggle = async (bookId: string, currentBookmarked: boolean) => {
    try {
      const updatedBook = await bookRepo.updateBookmark(bookId, !currentBookmarked);
      setBooks(prev => prev.map(book => 
        book.id === bookId ? updatedBook : book
      ));
    } catch (error) {
      console.error('Failed to update bookmark:', error);
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    
    try {
      await bookRepo.deleteBook(bookId);
      setBooks(prev => prev.filter(book => book.id !== bookId));
    } catch (error) {
      console.error('Failed to delete book:', error);
    }
  };

  const getCategoryColor = (category: Category) => {
    switch (category) {
      case Category.PHYSICS: return 'bg-blue-500';
      case Category.MATHS: return 'bg-green-600';
      case Category.AI: return 'bg-purple-600';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case Category.PHYSICS: return Science;
      case Category.MATHS: return Calculate;
      case Category.AI: return Cpu;
      default: return BookOpen;
    }
  };

  const openBook = (book: Book) => {
    setSelectedBook(book);
    setCurrentPage('viewer');
  };

  const bookmarkedBooks = books.filter(book => book.bookmarked);
  const categoryStats = Object.values(Category).reduce((acc, category) => {
    acc[category] = books.filter(book => book.category === category).length;
    return acc;
  }, {} as Record<Category, number>);

  // Book Card Component
  const BookCard: React.FC<{
    book: Book;
    variant?: 'grid' | 'list' | 'compact';
    onBookClick: () => void;
    onBookmarkClick: () => void;
    onDeleteClick: () => void;
  }> = ({ book, variant = 'grid', onBookClick, onBookmarkClick, onDeleteClick }) => {
    const categoryColor = getCategoryColor(book.category);
    const IconComponent = getCategoryIcon(book.category);

    if (variant === 'compact') {
      return (
        <div onClick={onBookClick} className="w-24 cursor-pointer rounded-lg border bg-white shadow-sm hover:shadow-md flex-shrink-0">
          <div className={`h-20 w-full ${categoryColor} flex items-center justify-center rounded-t-lg`}>
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          <div className="p-2">
            <p className="text-xs font-medium line-clamp-2">{book.title}</p>
          </div>
        </div>
      );
    }

    if (variant === 'list') {
      return (
        <div onClick={onBookClick} className="p-4 cursor-pointer rounded-lg border bg-white shadow-sm hover:shadow-md">
          <div className="flex items-center space-x-4">
            <div className={`w-14 h-14 ${categoryColor} rounded-lg flex items-center justify-center`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg line-clamp-2">{book.title}</h3>
              <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${categoryColor.replace('bg-', 'bg-')} bg-opacity-10`}>
                {book.category.charAt(0).toUpperCase() + book.category.slice(1)}
              </span>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onBookmarkClick();
                }}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <Bookmark 
                  className={`w-5 h-5 ${book.bookmarked ? 'text-blue-600' : 'text-gray-400'}`}
                  filled={book.bookmarked}
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteClick();
                }}
                className="p-2 hover:bg-gray-100 rounded text-red-500"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Grid variant (default)
    return (
      <div onClick={onBookClick} className="cursor-pointer rounded-lg border bg-white shadow-sm hover:shadow-md overflow-hidden">
        <div className={`h-32 w-full ${categoryColor} flex items-center justify-center relative`}>
          <IconComponent className="w-10 h-10 text-white" />
          <div className="absolute top-2 right-2 flex space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmarkClick();
              }}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
            >
              <Bookmark 
                className="w-4 h-4 text-white"
                filled={book.bookmarked}
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick();
              }}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
            >
              <Trash className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
        
        <div className="p-3">
          <h3 className="font-semibold text-sm line-clamp-2 mb-2">{book.title}</h3>
          <span className={`inline-block px-2 py-1 text-xs rounded-full ${categoryColor.replace('bg-', 'bg-')} bg-opacity-10`}>
            {book.category.charAt(0).toUpperCase() + book.category.slice(1)}
          </span>
        </div>
      </div>
    );
  };

  if (currentPage === 'viewer' && selectedBook) {
    return (
      <div className="min-h-screen bg-gray-900">
        <header className="bg-gray-800 text-white p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage('home')}
              className="p-2 hover:bg-gray-700 rounded"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold">{selectedBook.title}</h1>
              <p className="text-sm text-gray-300 capitalize">{selectedBook.category}</p>
            </div>
          </div>
        </header>
        <div className="p-4">
          <div className="bg-white rounded-lg overflow-hidden flex items-center justify-center" style={{ height: '80vh' }}>
            <div className="text-center text-gray-500">
              <BookOpen className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">PDF Viewer</h3>
              <p className="mb-4">This is a demonstration. In a real app, the PDF would be displayed here.</p>
              <p className="text-sm">File path: {selectedBook.path}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {showSearch ? (
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search books..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Library</h1>
                <p className="text-sm text-gray-600">Discover & Read</p>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                {showSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>

              {!showSearch && (
                <button
                  onClick={() => setCurrentView(currentView === ViewType.GRID ? ViewType.LIST : ViewType.GRID)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  {currentView === ViewType.GRID ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
                </button>
              )}

              <button
                onClick={() => setShowUpload(true)}
                className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 ml-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Book
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Categories Filter */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({books.length})
            </button>
            {Object.values(Category).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)} ({categoryStats[category] || 0})
              </button>
            ))}
          </div>
        </div>

        {/* Bookmarks Section */}
        {bookmarkedBooks.length > 0 && !query && !selectedCategory && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Bookmarked</h2>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {bookmarkedBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  variant="compact"
                  onBookClick={() => openBook(book)}
                  onBookmarkClick={() => handleBookmarkToggle(book.id, book.bookmarked)}
                  onDeleteClick={() => handleDeleteBook(book.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Books Grid/List */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              {query || selectedCategory ? 'Search Results' : 'All Books'}
            </h2>
            <span className="text-sm text-gray-500">
              {books.length} book{books.length !== 1 ? 's' : ''}
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-500">Loading books...</div>
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
              <p className="text-gray-500 mb-4">
                {query || selectedCategory 
                  ? 'Try adjusting your search or filters'
                  : 'Start building your library by adding some books'
                }
              </p>
              <button
                onClick={() => setShowUpload(true)}
                className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Book
              </button>
            </div>
          ) : (
            <div className={
              currentView === ViewType.GRID 
                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                : "space-y-4"
            }>
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  variant={currentView}
                  onBookClick={() => openBook(book)}
                                    onBookmarkClick={() => handleBookmarkToggle(book.id, book.bookmarked)}
                  onDeleteClick={() => handleDeleteBook(book.id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Upload Book</h2>
              <button onClick={() => setShowUpload(false)} className="p-2 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, category: e.target.value as Category }))}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Object.values(Category).map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">File</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setUploadForm(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
                  className="mt-1 block w-full text-sm text-gray-500"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowUpload(false)}
                  className="px-4 py-2 mr-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                  disabled={uploadForm.uploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                  disabled={uploadForm.uploading}
                >
                  {uploadForm.uploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFLibraryApp;
