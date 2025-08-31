import { useState, useEffect, useCallback, useMemo } from 'react';
import { Home, User, Info, ShoppingCart, Calendar, ArrowLeft, Star, Award, HelpCircle, Eye } from 'lucide-react';

// Mock Data
const mockDoctors = [
  { id: 1, name: "Dr. A. Mehta", specialization: "Cataract", qualification: "MS Ophthalmology", experience: 12, fee: 600, availability: "Mon–Sat 10–6", photoUrl: null },
  { id: 2, name: "Dr. R. Iyer", specialization: "LASIK", qualification: "MS, FPRS", experience: 8, fee: 700, availability: "Tue–Sun 11–7", photoUrl: null },
  { id: 3, name: "Dr. S. Khan", specialization: "Retina", qualification: "MS, FMRF", experience: 10, fee: 800, availability: "Mon–Fri 9–5", photoUrl: null }
];

const mockTreatments = [
  { id: 1, title: "LASIK", description: "Laser vision correction for better eyesight.", estimatedCost: 45000.00, imageUrl: null },
  { id: 2, title: "Cataract Surgery", description: "Safe and effective lens replacement.", estimatedCost: 30000.00, imageUrl: null },
  { id: 3, title: "Glaucoma Management", description: "Comprehensive pressure control treatment.", estimatedCost: 15000.00, imageUrl: null }
];

const mockProducts = [
  { id: 1, name: "Blue Light Glasses", description: "Protects your eyes from screen glare.", price: 1200.0, imageUrl: null },
  { id: 2, name: "Daily Contact Lenses", description: "Comfortable all-day wear.", price: 1500.0, imageUrl: null },
  { id: 3, name: "Reading Glasses", description: "Helps with near vision clarity.", price: 900.0, imageUrl: null }
];

const mockTestimonials = [
  { id: 1, patientName: "John Doe", comment: "Great experience! My vision improved after LASIK.", rating: 5 },
  { id: 2, patientName: "Mary Smith", comment: "Doctors were very professional and caring.", rating: 4 },
  { id: 3, patientName: "Rajesh Kumar", comment: "Smooth cataract surgery, highly recommend.", rating: 5 }
];

const mockAchievements = [
  { id: 1, title: "Best Eye Clinic Award", description: "Recognized as the best eye care provider in the city.", year: "2024" },
  { id: 2, title: "1000+ Successful LASIK Surgeries", description: "Celebrating over 1000 successful LASIK treatments.", year: "2023" },
  { id: 3, title: "ISO Certified Clinic", description: "Achieved ISO 9001 certification for high-quality care.", year: "2022" }
];

const mockFAQs = [
  { id: 1, question: "What is the best age for LASIK?", answer: "Typically between 18–40 years with stable vision." },
  { id: 2, question: "Do you offer free eye checkups?", answer: "Yes, during our special eye camp days." },
  { id: 3, question: "How long does a cataract surgery take?", answer: "Usually 15–30 minutes, with same-day discharge." }
];

// Navigation Component
const BottomNavBar = ({ currentScreen, setCurrentScreen }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'doctors', label: 'Doctors', icon: User },
    { id: 'treatments', label: 'Treatments', icon: Info },
    { id: 'shop', label: 'Shop', icon: ShoppingCart },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setCurrentScreen(id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              currentScreen === id 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Top Bar Component
const TopBar = ({ title, showBack, onBack }) => (
  <div className="sticky top-0 bg-blue-600 text-white p-4 flex items-center shadow-lg z-40">
    {showBack && (
      <button onClick={onBack} className="mr-3 p-1 hover:bg-blue-700 rounded">
        <ArrowLeft size={20} />
      </button>
    )}
    <h1 className="text-xl font-semibold">{title}</h1>
  </div>
);

// Home Screen
const HomeScreen = ({ setCurrentScreen, setSelectedItem }) => (
  <div className="p-6 pb-20">
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Eye Clinic</h2>
      <p className="text-gray-600">Your vision, our mission</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button 
        onClick={() => setCurrentScreen('doctors')}
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        <Calendar className="w-8 h-8 mb-3" />
        <h3 className="text-lg font-semibold mb-2">Book Appointment</h3>
        <p className="text-blue-100 text-sm">Schedule with our expert doctors</p>
      </button>

      <button 
        onClick={() => setCurrentScreen('treatments')}
        className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        <Info className="w-8 h-8 mb-3" />
        <h3 className="text-lg font-semibold mb-2">Treatments</h3>
        <p className="text-green-100 text-sm">Explore our services</p>
      </button>

      <button 
        onClick={() => setCurrentScreen('vision')}
        className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        <Eye className="w-8 h-8 mb-3" />
        <h3 className="text-lg font-semibold mb-2">Vision Tests</h3>
        <p className="text-purple-100 text-sm">Test your vision online</p>
      </button>

      <button 
        onClick={() => setCurrentScreen('faq')}
        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        <HelpCircle className="w-8 h-8 mb-3" />
        <h3 className="text-lg font-semibold mb-2">FAQs</h3>
        <p className="text-orange-100 text-sm">Find answers to common questions</p>
      </button>
    </div>

    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <button 
        onClick={() => {
          setCurrentScreen('testimonials');
          setSelectedItem(null);
        }}
        className="bg-white border border-gray-200 p-4 rounded-lg shadow hover:shadow-md transition-all transform hover:scale-105"
      >
        <div className="flex items-center mb-2">
          <Star className="w-5 h-5 text-yellow-500 mr-2" />
          <span className="font-medium">Testimonials</span>
        </div>
        <p className="text-gray-600 text-sm">Read patient reviews</p>
      </button>

      <button 
        onClick={() => {
          setCurrentScreen('achievements');
          setSelectedItem(null);
        }}
        className="bg-white border border-gray-200 p-4 rounded-lg shadow hover:shadow-md transition-all transform hover:scale-105"
      >
        <div className="flex items-center mb-2">
          <Award className="w-5 h-5 text-blue-500 mr-2" />
          <span className="font-medium">Achievements</span>
        </div>
        <p className="text-gray-600 text-sm">Our awards and recognition</p>
      </button>
    </div>
  </div>
);

// Doctors Screen
const DoctorsScreen = ({ setCurrentScreen, setSelectedItem }) => (
  <div className="p-6 pb-20">
    <h2 className="text-2xl font-bold mb-6">Our Doctors</h2>
    <div className="space-y-4">
      {mockDoctors.map(doctor => (
        <div key={doctor.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.specialization} • {doctor.experience} yrs • Fee ₹{doctor.fee}</p>
              <p className="text-sm text-gray-500 mt-1">{doctor.availability}</p>
              <p className="text-sm text-green-600 mt-1">Available</p>
            </div>
            <button 
              onClick={() => {
                setSelectedItem(doctor);
                setCurrentScreen('doctor-detail');
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Doctor Detail Screen
const DoctorDetailScreen = ({ doctor, setCurrentScreen, setSelectedItem }) => (
  <div className="p-6 pb-20">
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mr-4">
          <User className="w-10 h-10 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{doctor.name}</h2>
          <p className="text-blue-600 font-medium">{doctor.specialization}</p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Qualification:</span>
          <span className="font-medium">{doctor.qualification}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Experience:</span>
          <span className="font-medium">{doctor.experience} years</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Consultation Fee:</span>
          <span className="font-medium text-green-600">₹{doctor.fee}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Availability:</span>
          <span className="font-medium">{doctor.availability}</span>
        </div>
      </div>

      <button 
        onClick={() => {
          setSelectedItem(doctor);
          setCurrentScreen('book-appointment');
        }}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Book Appointment
      </button>
    </div>
  </div>
);

// Book Appointment Screen
const BookAppointmentScreen = ({ doctor, setCurrentScreen }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    time: ''
  });
  const [isBooking, setIsBooking] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsBooking(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('Appointment booked successfully!');
    setIsBooking(false);
    setCurrentScreen('home');
  };

  return (
    <div className="p-6 pb-20">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Book Appointment</h2>
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold">{doctor.name}</h3>
          <p className="text-gray-600">{doctor.specialization} • Fee: ₹{doctor.fee}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
            <input
              type="number"
              required
              min="1"
              max="120"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select
              required
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date & Time</label>
            <input
              type="datetime-local"
              required
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={isBooking}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isBooking ? 'Booking...' : 'Confirm Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Treatments Screen
const TreatmentsScreen = ({ setCurrentScreen, setSelectedItem }) => (
  <div className="p-6 pb-20">
    <h2 className="text-2xl font-bold mb-6">Our Treatments</h2>
    <div className="space-y-4">
      {mockTreatments.map(treatment => (
        <div 
          key={treatment.id} 
          onClick={() => {
            setSelectedItem(treatment);
            setCurrentScreen('treatment-detail');
          }}
          className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-all transform hover:scale-105"
        >
          <h3 className="text-xl font-semibold mb-2">{treatment.title}</h3>
          <p className="text-gray-600 mb-3">{treatment.description}</p>
          <p className="text-lg font-semibold text-green-600">Est. Cost: ₹{treatment.estimatedCost.toLocaleString()}</p>
        </div>
      ))}
    </div>
  </div>
);

// Treatment Detail Screen
const TreatmentDetailScreen = ({ treatment }) => (
  <div className="p-6 pb-20">
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{treatment.title}</h2>
      <p className="text-gray-700 text-lg leading-relaxed mb-6">{treatment.description}</p>
      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <p className="text-xl font-semibold text-green-700">
          Estimated Cost: ₹{treatment.estimatedCost.toLocaleString()}
        </p>
      </div>
      <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
        Book This Treatment
      </button>
    </div>
  </div>
);

// Shop Screen
const ShopScreen = () => (
  <div className="p-6 pb-20">
    <h2 className="text-2xl font-bold mb-6">Eye Care Products</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {mockProducts.map(product => (
        <div key={product.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all transform hover:scale-105">
          <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-green-600">₹{product.price}</span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Vision Tests Screen
const VisionTestsScreen = () => (
  <div className="p-6 pb-20">
    <h2 className="text-2xl font-bold mb-6">Vision Tests</h2>
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
        <h3 className="text-lg font-semibold mb-2">Snellen Chart Test</h3>
        <p className="text-gray-600 mb-4">Test your visual acuity with the standard eye chart</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Start Test
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
        <h3 className="text-lg font-semibold mb-2">Color Blindness Test</h3>
        <p className="text-gray-600 mb-4">Check for color vision deficiencies</p>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Start Test
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
        <h3 className="text-lg font-semibold mb-2">Amsler Grid Test</h3>
        <p className="text-gray-600 mb-4">Test for macular degeneration and other retinal issues</p>
        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          Start Test
        </button>
      </div>
    </div>
  </div>
);

// FAQ Screen
const FAQScreen = () => (
  <div className="p-6 pb-20">
    <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
    <div className="space-y-4">
      {mockFAQs.map(faq => (
        <div key={faq.id} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-lg mb-3 text-blue-800">{faq.question}</h3>
          <p className="text-gray-700">{faq.answer}</p>
        </div>
      ))}
    </div>
  </div>
);

// Testimonials Screen
const TestimonialsScreen = () => (
  <div className="p-6 pb-20">
    <h2 className="text-2xl font-bold mb-6">Patient Testimonials</h2>
    <div className="space-y-4">
      {mockTestimonials.map(testimonial => (
        <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-lg mb-2">{testimonial.patientName}</h3>
          <p className="text-gray-700 mb-3">{testimonial.comment}</p>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Rating:</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Achievements Screen
const AchievementsScreen = () => (
  <div className="p-6 pb-20">
    <h2 className="text-2xl font-bold mb-6">Our Achievements</h2>
    <div className="space-y-4">
      {mockAchievements.map(achievement => (
        <div key={achievement.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start">
            <Award className="w-6 h-6 text-yellow-500 mr-3 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
              <p className="text-gray-600 mb-2">{achievement.description}</p>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Year: {achievement.year}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Profile Screen
const ProfileScreen = () => (
  <div className="p-6 pb-20">
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Patient Profile</h2>
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mr-4">
          <User className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Welcome!</h3>
          <p className="text-gray-600">Manage your appointments and profile</p>
        </div>
      </div>

      <div className="space-y-4">
        <button className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors text-left">
          <h4 className="font-medium">My Appointments</h4>
          <p className="text-blue-100 text-sm">View and manage your bookings</p>
        </button>

        <button className="w-full bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors text-left">
          <h4 className="font-medium">Medical History</h4>
          <p className="text-green-100 text-sm">Access your treatment records</p>
        </button>

        <button className="w-full bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors text-left">
          <h4 className="font-medium">Settings</h4>
          <p className="text-purple-100 text-sm">Update your preferences</p>
        </button>
      </div>
    </div>
  </div>
);

// Main App Component
const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);

  const screenConfig = {
    home: { title: 'Eye Clinic', showBack: false },
    doctors: { title: 'Our Doctors', showBack: false },
    'doctor-detail': { title: 'Doctor Details', showBack: true },
    'book-appointment': { title: 'Book Appointment', showBack: true },
    treatments: { title: 'Treatments', showBack: false },
    'treatment-detail': { title: 'Treatment Details', showBack: true },
    shop: { title: 'Shop', showBack: false },
    profile: { title: 'Profile', showBack: false },
    vision: { title: 'Vision Tests', showBack: true },
    faq: { title: 'FAQs', showBack: true },
    testimonials: { title: 'Testimonials', showBack: true },
    achievements: { title: 'Achievements', showBack: true }
  };

  const handleBack = () => {
    if (currentScreen === 'doctor-detail' || currentScreen === 'book-appointment') {
      setCurrentScreen('doctors');
    } else if (currentScreen === 'treatment-detail') {
      setCurrentScreen('treatments');
    } else {
      setCurrentScreen('home');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen setCurrentScreen={setCurrentScreen} setSelectedItem={setSelectedItem} />;
      case 'doctors':
        return <DoctorsScreen setCurrentScreen={setCurrentScreen} setSelectedItem={setSelectedItem} />;
      case 'doctor-detail':
        return selectedItem ? (
          <DoctorDetailScreen 
            doctor={selectedItem} 
            setCurrentScreen={setCurrentScreen} 
            setSelectedItem={setSelectedItem} 
          />
        ) : <div className="p-6">Doctor not found</div>;
      case 'book-appointment':
        return selectedItem ? (
          <BookAppointmentScreen 
            doctor={selectedItem} 
            setCurrentScreen={setCurrentScreen} 
          />
        ) : <div className="p-6">Please select a doctor first</div>;
      case 'treatments':
        return <TreatmentsScreen setCurrentScreen={setCurrentScreen} setSelectedItem={setSelectedItem} />;
      case 'treatment-detail':
        return selectedItem ? (
          <TreatmentDetailScreen treatment={selectedItem} />
        ) : <div className="p-6">Treatment not found</div>;
      case 'shop':
        return <ShopScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'vision':
        return <VisionTestsScreen />;
      case 'faq':
        return <FAQScreen />;
      case 'testimonials':
        return <TestimonialsScreen />;
      case 'achievements':
        return <AchievementsScreen />;
      default:
        return <HomeScreen setCurrentScreen={setCurrentScreen} setSelectedItem={setSelectedItem} />;
    }
  };

  const config = screenConfig[currentScreen] || screenConfig.home;

  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.3s ease-in;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
      `}</style>
      
      <TopBar 
        title={config.title} 
        showBack={config.showBack} 
        onBack={handleBack} 
      />
      
      <main className="min-h-screen">
        {renderScreen()}
      </main>

      <BottomNavBar 
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
      />
    </div>
  );
};

export default App;