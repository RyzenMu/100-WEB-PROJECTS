// pages/Home.jsx
import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Hero />
      <Testimonials />
    </main>
  );
}