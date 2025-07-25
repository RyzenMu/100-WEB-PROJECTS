// pages/Photos.jsx
import { useState } from 'react';
import { FiTrash2, FiZoomIn } from 'react-icons/fi';

export default function Photos() {
  const [photos, setPhotos] = useState([]);
  const [modalPhoto, setModalPhoto] = useState(null);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => ({
      id: URL.createObjectURL(file),
      file,
      url: URL.createObjectURL(file),
    }));
    setPhotos(prev => [...prev, ...newPhotos]);
  };

  const handleDelete = (id) => {
    setPhotos(prev => prev.filter(photo => photo.id !== id));
  };

  const openModal = (photo) => {
    setModalPhoto(photo);
  };

  const closeModal = () => {
    setModalPhoto(null);
  };

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Photos</h2>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handlePhotoUpload}
        className="mb-4"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map(photo => (
          <div key={photo.id} className="relative group">
            <img
              src={photo.url}
              alt="Uploaded"
              className="rounded shadow cursor-pointer"
              onClick={() => openModal(photo)}
            />
            <button
              onClick={() => handleDelete(photo.id)}
              className="absolute top-1 right-1 bg-white p-1 rounded-full shadow text-red-500 hover:bg-red-100"
            >
              <FiTrash2 />
            </button>
            <button
              onClick={() => openModal(photo)}
              className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow hover:bg-gray-100"
            >
              <FiZoomIn />
            </button>
          </div>
        ))}
      </div>

      {modalPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <img
            src={modalPhoto.url}
            alt="Full Size"
            className="max-w-full max-h-full"
          />
        </div>
      )}
    </section>
  );
}