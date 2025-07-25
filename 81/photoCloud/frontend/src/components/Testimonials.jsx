// components/Testimonials.jsx
export default function Testimonials() {
  return (
    <section className="p-10 bg-white">
      <h3 className="text-2xl font-semibold text-center mb-6">What our users say</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Amazing service!', 'Very secure and fast.', 'I love the UI!'].map((text, i) => (
          <div key={i} className="bg-gray-100 p-4 rounded shadow">
            <p className="italic">"{text}"</p>
            <p className="mt-2 text-sm text-right">- User {i + 1}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
