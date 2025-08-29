import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Briefcase, 
  Play, 
  Info, 
  DollarSign, 
  Menu, 
  X,
  Loader2,
  CheckCircle,
  XCircle
} from 'lucide-react';
import bcrypt from 'bcryptjs';

// Types
type Route = 'home' | 'services' | 'how_it_works' | 'about_us' | 'pricing' | 'signup' | 'login';

interface User {
  name: string;
  email: string;
  password_hash: string;
}

// Theme Colors (matching Android theme)
const theme = {
  gray900: '#1A1A1A',
  gray800: '#222222',
  textWhite: '#FFFFFF',
  acidGreen: '#A6FF00',
  hoverBlack: '#000000'
};

// API Functions
const SUPABASE_URL = 'https://vxexigrndbgzgbnbvhtr.supabase.co/rest/v1/square_up_users';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4ZXhpZ3JuZGJnemdibmJ2aHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjE5NjksImV4cCI6MjA1OTQ5Nzk2OX0.hTWvkU7IRnkSG-kVJVnq6cdLK2Gn8w3nSj_IQXno-Qk';

const insertUser = async (name: string, email: string, password: string): Promise<void> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const response = await fetch(SUPABASE_URL, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({
      name,
      email,
      password_hash: hashedPassword
    })
  });

  if (!response.ok) {
    throw new Error(`Signup error: ${response.status}`);
  }
};

const fetchUser = async (email: string, password: string): Promise<string> => {
  const response = await fetch(`${SUPABASE_URL}?email=eq.${email}`, {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Login error: ${response.status}`);
  }

  const users: User[] = await response.json();
  
  if (users.length === 0) {
    throw new Error('Invalid email or password');
  }

  const user = users[0];
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  return user.name;
};

// Components
const SectionCard: React.FC<{
  title: string;
  body: string;
  accent?: boolean;
  className?: string;
}> = ({ title, body, accent = false, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`w-full p-5 rounded-3xl transition-all duration-200 cursor-pointer ${
        accent && !isHovered 
          ? 'bg-lime-400 text-black' 
          : isHovered 
            ? 'bg-black text-white' 
            : 'bg-gray-800 text-white'
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className={`${accent && !isHovered ? 'text-black' : 'text-gray-200'} opacity-90`}>
        {body}
      </p>
    </div>
  );
};

const PageScaffold: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div className="min-h-screen overflow-y-auto p-4 space-y-4">
    <h1 className="text-4xl font-bold text-white mb-6">{title}</h1>
    {children}
    <div className="h-20"></div>
  </div>
);

const HomeScreen: React.FC<{ onCta: () => void }> = ({ onCta }) => (
  <PageScaffold title="We build delightful digital experiences">
    <SectionCard
      title="Launch your brand in dark, sleek style"
      body="Modern websites, apps, and strategy. Built fast with thoughtful UX."
      accent
    />
    <div className="flex gap-3">
      <button
        onClick={onCta}
        className="px-6 py-3 bg-lime-400 text-black rounded-lg hover:bg-lime-300 transition-colors"
      >
        Explore Services
      </button>
      <button className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition-colors">
        See Demo
      </button>
    </div>
    <SectionCard
      title="What clients say"
      body={`"Amazing turnaround and pixel-perfect design." — A happy client`}
    />
  </PageScaffold>
);

const ServicesScreen: React.FC = () => (
  <PageScaffold title="Services">
    <SectionCard title="Web & Mobile" body="Responsive sites and Android apps with Compose." />
    <SectionCard title="Brand & UI" body="Design systems and Figma to production pipelines." />
    <SectionCard title="Growth" body="SEO, performance and analytics baked in." />
  </PageScaffold>
);

const HowItWorksScreen: React.FC = () => (
  <PageScaffold title="How it works">
    <SectionCard title="1. Discover" body="Workshops to align goals and audience." accent />
    <SectionCard title="2. Design" body="Figma flows, components and prototypes." />
    <SectionCard title="3. Build" body="Composable architecture, fast iterations." />
    <SectionCard title="4. Launch" body="QA, analytics, and handoff." />
  </PageScaffold>
);

const AboutUsScreen: React.FC = () => (
  <PageScaffold title="About us">
    <SectionCard title="Who we are" body="A small, senior team crafting premium digital products." />
    <SectionCard title="Stack" body="Kotlin, Jetpack Compose, Material 3, and modern tooling." />
  </PageScaffold>
);

const PricingScreen: React.FC = () => (
  <PageScaffold title="Pricing">
    <SectionCard title="Starter" body="₹49,999 — 1 page, 1 week, essentials." accent />
    <SectionCard title="Pro" body="₹1,49,999 — up to 5 pages, 3 weeks, integrations." />
    <SectionCard title="Enterprise" body="Custom — scope-based, SLA, support." />
  </PageScaffold>
);

const SignupScreen: React.FC<{ navigate: (route: Route) => void }> = ({ navigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('All fields are required');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      await insertUser(name, email, password);
      setShowSuccess(true);
      setTimeout(() => navigate('login'), 2000);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageScaffold title="Signup">
      {errorMessage && (
        <div className="w-full p-4 bg-red-600 text-white rounded-lg">
          <p className="font-bold">Error: {errorMessage}</p>
        </div>
      )}

      {showSuccess ? (
        <div className="w-full p-4 bg-lime-400 text-black rounded-lg text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5" />
            <p className="text-lg font-bold">Signup Successful!</p>
          </div>
          <p>Redirecting to login...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrorMessage(null);
            }}
            disabled={isLoading}
            className="w-full p-3 bg-transparent border-2 border-white focus:border-lime-400 rounded-lg text-white placeholder-gray-300 outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMessage(null);
            }}
            disabled={isLoading}
            className="w-full p-3 bg-transparent border-2 border-white focus:border-lime-400 rounded-lg text-white placeholder-gray-300 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage(null);
            }}
            disabled={isLoading}
            className="w-full p-3 bg-transparent border-2 border-white focus:border-lime-400 rounded-lg text-white placeholder-gray-300 outline-none"
          />
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full p-3 bg-lime-400 text-black rounded-lg hover:bg-lime-300 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing up...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </div>
      )}
    </PageScaffold>
  );
};

const LoginScreen: React.FC<{ navigate: (route: Route) => void }> = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userName, setUserName] = useState('');

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage('All fields are required');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const name = await fetchUser(email, password);
      setUserName(name);
      setShowSuccess(true);
      setTimeout(() => navigate('home'), 2000);
    } catch (error) {
      let message = 'Login failed';
      if (error instanceof Error) {
        if (error.message.includes('Network')) {
          message = 'Network error. Please check your connection.';
        } else if (error.message.includes('Invalid email or password')) {
          message = 'Invalid email or password. Please try again.';
        } else {
          message = error.message;
        }
      }
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageScaffold title="Login">
      {errorMessage && (
        <div className="w-full p-4 bg-red-600 text-white rounded-lg">
          <p className="font-bold">Error: {errorMessage}</p>
        </div>
      )}

      {showSuccess ? (
        <div className="w-full p-4 bg-lime-400 text-black rounded-lg text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5" />
            <p className="text-lg font-bold">Login Successful!</p>
          </div>
          <p>Welcome back, {userName}</p>
          <p>Redirecting to home...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMessage(null);
            }}
            disabled={isLoading}
            className="w-full p-3 bg-transparent border-2 border-white focus:border-lime-400 rounded-lg text-white placeholder-gray-300 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage(null);
            }}
            disabled={isLoading}
            className="w-full p-3 bg-transparent border-2 border-white focus:border-lime-400 rounded-lg text-white placeholder-gray-300 outline-none"
          />
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full p-3 bg-lime-400 text-black rounded-lg hover:bg-lime-300 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </div>
      )}
    </PageScaffold>
  );
};

// Main App Component
const DigitalAgencyApp: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = (route: Route) => {
    setCurrentRoute(route);
    setIsDrawerOpen(false);
  };

  const navigationItems = [
    { route: 'home' as Route, label: 'Home', icon: Home },
    { route: 'services' as Route, label: 'Services', icon: Briefcase },
    { route: 'how_it_works' as Route, label: 'How', icon: Play },
    { route: 'about_us' as Route, label: 'About', icon: Info },
    { route: 'pricing' as Route, label: 'Pricing', icon: DollarSign },
  ];

  const renderContent = () => {
    switch (currentRoute) {
      case 'home':
        return <HomeScreen onCta={() => navigate('services')} />;
      case 'services':
        return <ServicesScreen />;
      case 'how_it_works':
        return <HowItWorksScreen />;
      case 'about_us':
        return <AboutUsScreen />;
      case 'pricing':
        return <PricingScreen />;
      case 'signup':
        return <SignupScreen navigate={navigate} />;
      case 'login':
        return <LoginScreen navigate={navigate} />;
      default:
        return <HomeScreen onCta={() => navigate('services')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Top Bar */}
      <header className="bg-gray-800 p-4 flex items-center justify-between">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-lg font-semibold">Digital Agency</h1>
        <div className="w-10"></div>
      </header>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Side Drawer */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-gray-800 z-50 transform transition-transform duration-300 ${
        isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-2">
          <button
            onClick={() => navigate('signup')}
            className="w-full text-left p-3 text-lg hover:bg-gray-700 rounded-lg transition-colors"
          >
            Signup
          </button>
          <button
            onClick={() => navigate('login')}
            className="w-full text-left p-3 text-lg hover:bg-gray-700 rounded-lg transition-colors"
          >
            Login
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-gray-800 p-2">
        <div className="flex justify-around">
          {navigationItems.map(({ route, label, icon: Icon }) => (
            <button
              key={route}
              onClick={() => navigate(route)}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                currentRoute === route 
                  ? 'bg-lime-400 text-black' 
                  : 'text-white hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default DigitalAgencyApp;