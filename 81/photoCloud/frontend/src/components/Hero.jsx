// components/Hero.jsx
export default function Hero() {
  return (
    <section className="text-center p-10 bg-blue-50">
      <h2 className="text-3xl font-bold mb-4">Store Your Memories in the Cloud</h2>
      <p className="text-gray-600 mb-4">Easily upload and access your personal photos securely from anywhere.</p>
      <img src="https://picsum.photos/1200/400" alt="Photo Cloud" className="mx-auto rounded-md shadow" />
    </section>
  );
}