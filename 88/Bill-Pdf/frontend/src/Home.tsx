import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  ChefHat, 
  Heart, 
  Award,
  Users,
  Utensils,
  ArrowRight,
  Menu,
  X,
  Send
} from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'appetizer' | 'main' | 'dessert' | 'beverage';
  isVegan: boolean;
  image: string;
  rating: number;
}

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const featuredItems: MenuItem[] = [
    {
      id: 1,
      name: "Mediterranean Quinoa Bowl",
      description: "Fresh quinoa with roasted vegetables, chickpeas, and tahini dressing",
      price: 18.99,
      category: 'main',
      isVegan: true,
      image: "🥗",
      rating: 4.8
    },
    {
      id: 2,
      name: "Truffle Mushroom Risotto",
      description: "Creamy arborio rice with wild mushrooms and truffle oil",
      price: 24.99,
      category: 'main',
      isVegan: false,
      image: "🍚",
      rating: 4.9
    },
    {
      id: 3,
      name: "Rainbow Buddha Bowl",
      description: "Colorful mix of seasonal vegetables, avocado, and house-made hummus",
      price: 16.99,
      category: 'main',
      isVegan: true,
      image: "🥙",
      rating: 4.7
    }
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "The most amazing vegetarian food I've ever had! The flavors are incredible and the atmosphere is perfect.",
      avatar: "👩‍🦰"
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 5,
      comment: "As a meat-lover who tried vegetarian for the first time here, I was blown away. Will definitely be back!",
      avatar: "👨‍💼"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      rating: 5,
      comment: "Green Garden has become our family's favorite restaurant. The kids love it too!",
      avatar: "👩‍🎓"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating: number): JSX.Element[] => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));          
  };

  const handleContactSubmit = () => {
    if (contactForm.name && contactForm.email && contactForm.message) {
      alert('Thank you for your message! We\'ll get back to you soon.');
      setContactForm({ name: '', email: '', message: '' });
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-lg shadow-lg border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-500 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                Green Garden
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-green-700 hover:text-emerald-600 font-medium transition-colors">Home</a>
              <a href="#menu" className="text-green-700 hover:text-emerald-600 font-medium transition-colors">Menu</a>
              <a href="#about" className="text-green-700 hover:text-emerald-600 font-medium transition-colors">About</a>
              <a href="#contact" className="text-green-700 hover:text-emerald-600 font-medium transition-colors">Contact</a>
              <button className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-2 rounded-full hover:from-green-700 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105">
                Reserve Table
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-green-50 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6 text-green-700" /> : <Menu className="w-6 h-6 text-green-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-green-100">
            <div className="px-4 py-4 space-y-4">
              <a href="#home" className="block text-green-700 hover:text-emerald-600 font-medium">Home</a>
              <a href="#menu" className="block text-green-700 hover:text-emerald-600 font-medium">Menu</a>
              <a href="#about" className="block text-green-700 hover:text-emerald-600 font-medium">About</a>
              <a href="#contact" className="block text-green-700 hover:text-emerald-600 font-medium">Contact</a>
              <button className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-3 rounded-full hover:from-green-700 hover:to-emerald-600 transition-all duration-300">
                Reserve Table
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
                  <Leaf className="w-4 h-4 text-green-600" />
                  <span className="text-green-700 font-medium">100% Plant-Based</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-gray-900">Fresh, </span>
                  <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                    Healthy
                  </span>
                  <br />
                  <span className="text-gray-900">& Delicious</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Experience the finest vegetarian cuisine crafted with locally-sourced, 
                  organic ingredients. Every dish tells a story of sustainability and flavor.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-8 py-4 rounded-full font-semibold hover:from-green-700 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <span>View Our Menu</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-green-600 text-green-700 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition-all duration-300 flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">4.9</div>
                  <div className="text-gray-600 text-sm">Rating</div>
                  <div className="flex justify-center mt-1">
                    {renderStars(5)}
                  </div>
                </div>
                <div className="w-px h-12 bg-green-200"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">500+</div>
                  <div className="text-gray-600 text-sm">Happy Customers</div>
                </div>
                <div className="w-px h-12 bg-green-200"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">50+</div>
                  <div className="text-gray-600 text-sm">Dishes</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-green-200 to-emerald-200 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <div className="text-6xl text-center mb-4">🥗</div>
                  <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">Today's Special</h3>
                  <p className="text-gray-600 text-center">Garden Fresh Salad Bowl</p>
                  <div className="flex justify-center mt-4">
                    {renderStars(5)}
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center text-2xl animate-bounce">
                🌱
              </div>
              <div className="absolute -bottom-4 -right-4 bg-orange-400 rounded-full w-12 h-12 flex items-center justify-center text-xl animate-pulse">
                🥕
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Green Garden?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing exceptional vegetarian dining experiences 
              that nourish both body and soul.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl hover:bg-green-50 transition-colors duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">100% Organic</h3>
              <p className="text-gray-600 leading-relaxed">
                All our ingredients are sourced from certified organic farms, 
                ensuring the freshest and most nutritious meals.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl hover:bg-green-50 transition-colors duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Expert Chefs</h3>
              <p className="text-gray-600 leading-relaxed">
                Our experienced chefs create innovative vegetarian dishes 
                that satisfy even the most discerning palates.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl hover:bg-green-50 transition-colors duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Made with Love</h3>
              <p className="text-gray-600 leading-relaxed">
                Every dish is prepared with passion and care, 
                creating memorable dining experiences for our guests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section id="menu" className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Dishes</h2>
            <p className="text-xl text-gray-600">
              Discover our most popular vegetarian creations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="p-8">
                  <div className="text-6xl text-center mb-4">{item.image}</div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                    {item.isVegan && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        Vegan
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-700">${item.price}</span>
                    <div className="flex items-center space-x-1">
                      {renderStars(Math.floor(item.rating))}
                      <span className="text-gray-600 text-sm ml-1">{item.rating}</span>
                    </div>
                  </div>
                  <button className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-600 transition-all duration-300">
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-white text-green-700 border-2 border-green-600 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition-all duration-300 flex items-center space-x-2 mx-auto">
              <Utensils className="w-5 h-5" />
              <span>View Full Menu</span>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">
              Hear from our happy diners
            </p>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 text-center">
              <div className="text-4xl mb-4">{testimonials[currentTestimonial].avatar}</div>
              <div className="flex justify-center mb-4">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed italic">
                "{testimonials[currentTestimonial].comment}"
              </p>
              <h4 className="text-lg font-semibold text-green-700">
                {testimonials[currentTestimonial].name}
              </h4>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-green-600' : 'bg-green-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section id="contact" className="py-16 bg-gradient-to-br from-green-900 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Visit Us Today</h2>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Come experience the best vegetarian cuisine in town. 
                We're open seven days a week and ready to serve you!
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-green-100">123 Garden Street, Green City, GC 12345</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Hours</h3>
                    <p className="text-green-100">Mon-Sun: 11:00 AM - 10:00 PM</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-green-100">(555) 123-GARDEN</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-green-100">hello@greengarden.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-green-100 focus:outline-none focus:border-green-400 focus:bg-white/30 transition-all"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-green-100 focus:outline-none focus:border-green-400 focus:bg-white/30 transition-all"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-green-100 focus:outline-none focus:border-green-400 focus:bg-white/30 transition-all resize-none"
                  />
                </div>
                <button
                  onClick={handleContactSubmit}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-400 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-500 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-500 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Green Garden</span>
            </div>
            <p className="text-gray-400 text-center md:text-left">
              © 2024 Green Garden Restaurant. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400">Follow us:</span>
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer">
                  📘
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer">
                  📷
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer">
                  🐦
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;