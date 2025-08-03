import React, { useState, useRef } from 'react';

/**
 * PhotoUpload component - Handles photo uploads with drag & drop
 */
const PhotoUpload = ({ onUploadSuccess, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

  /**
   * Validate file before adding to selection
   */
  const validateFile = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Only image files (JPEG, PNG, GIF, WebP) are allowed';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size must be less than 5MB';
    }
    return null;
  };

  /**
   * Create preview for selected files
   */
  const createPreview = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  };

  /**
   * Handle file selection
   */
  const handleFiles = async (files) => {
    const fileArray = Array.from(files);
    const validFiles = [];
    const newPreviews = [];
    let errorMessages = [];

    for (const file of fileArray) {
      const error = validateFile(file);
      if (error) {
        errorMessages.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
        const preview = await createPreview(file);
        newPreviews.push({
          file,
          preview,
          id: Math.random().toString(36).substr(2, 9)
        });
      }
    }

    if (errorMessages.length > 0) {
      setError(errorMessages.join('\n'));
    } else {
      setError('');
    }

    setSelectedFiles(prev => [...prev, ...validFiles]);
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  /**
   * Handle drag events
   */
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  /**
   * Handle drop event
   */
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  /**
   * Handle file input change
   */
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  /**
   * Remove file from selection
   */
  const removeFile = (id) => {
    setPreviews(prev => prev.filter(p => p.id !== id));
    setSelectedFiles(prev => {
      const previewToRemove = previews.find(p => p.id === id);
      return prev.filter(f => f !== previewToRemove?.file);
    });
  };

  /**
   * Simulate file upload
   */
  const simulateUpload = (file) => {
    return new Promise((resolve, reject) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          // Simulate random success/failure
          if (Math.random() > 0.1) {
            resolve({
              id: Math.random().toString(36).substr(2, 9),
              filename: file.name,
              url: URL.createObjectURL(file),
              size: file.size,
              created_at: new Date().toISOString()
            });
          } else {
            reject(new Error('Upload failed'));
          }
        }
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: Math.min(progress, 100)
        }));
      }, 200);
    });
  };

  /**
   * Upload all selected files
   */
  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    setError('');
    const uploadedFiles = [];
    const failedFiles = [];

    for (const file of selectedFiles) {
      try {
        const result = await simulateUpload(file);
        uploadedFiles.push(result);
      } catch (error) {
        failedFiles.push(file.name);
      }
    }

    setUploading(false);

    if (failedFiles.length > 0) {
      setError(`Failed to upload: ${failedFiles.join(', ')}`);
    }

    if (uploadedFiles.length > 0) {
      onUploadSuccess && onUploadSuccess(uploadedFiles);
      // Clear successful uploads
      const failedFileObjects = selectedFiles.filter(f => failedFiles.includes(f.name));
      setSelectedFiles(failedFileObjects);
      setPreviews(prev => prev.filter(p => failedFiles.includes(p.file.name)));
      setUploadProgress({});
    }
  };

  /**
   * Clear all selections
   */
  const clearAll = () => {
    setSelectedFiles([]);
    setPreviews([]);
    setError('');
    setUploadProgress({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <h2 className="text-2xl font-bold">Upload Photos</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={uploading}
            />
            
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              
              <div>
                <p className="text-lg font-semibold text-gray-700">
                  Drop your photos here, or click to browse
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Supports: JPEG, PNG, GIF, WebP (max 5MB each)
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm whitespace-pre-line">
              {error}
            </div>
          )}

          {/* Preview Grid */}
          {previews.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Selected Photos ({previews.length})
                </h3>
                <button
                  onClick={clearAll}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                  disabled={uploading}
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {previews.map((item) => (
                  <div key={item.id} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.preview}
                        alt={item.file.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Remove button */}
                      <button
                        onClick={() => removeFile(item.id)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        disabled={uploading}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      {/* Upload progress */}
                      {uploading && uploadProgress[item.file.name] !== undefined && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="text-sm font-medium">
                              {Math.round(uploadProgress[item.file.name])}%
                            </div>
                            <div className="w-16 bg-gray-300 rounded-full h-2 mt-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress[item.file.name]}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-600 mt-2 truncate" title={item.file.name}>
                      {item.file.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {(item.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={selectedFiles.length === 0 || uploading}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  `Upload ${selectedFiles.length} Photo${selectedFiles.length !== 1 ? 's' : ''}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;