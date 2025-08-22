import { Routes, Route, Link, useNavigate } from "react-router-dom";
import './App.css'
import LinkButton from "./LinkButton";
import Loader from "./Loader";
export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order" element={<Order />} />
        <Route path="/orderSummary" element={<OrderSummary />} />
      </Routes>
      <Footer />
    </div>
  );
}

function OrderSummary(){
  return <div className="px-4 py-6 space-y-8">
   
    <div className="flex items-center gap-5flex-wrap justify-between">
    <p className="text-xl font-semibold"> Order # 561 Status</p>
    <div className="flex gap-5"><div className="bg-red-500 rounded-full py-1 px-3 text-sm uppercase font-semibold text-center text-red-50 tracking-wide">Priority</div>
     <span className="bg-green-400 rounded-2xl mx-5 px-5 text-green-200 uppercase text-sm font-semibold items-center"> preparing order</span> </div>
    </div>
    <div className="flex flex-wrap px-5 py-5 bg-stone-200">
    <p>Order should have arrived</p>
    <p>Estimated Delivery : Apr 24, 7.25 A.M</p>
    </div>
    <div className="space-y-2 bg-stone-200 p-5">

    <p className="text-sm font-medium text-stone-600">Price Pizza Rs.147</p>   
    <p className="text-sm font-medium text-stone-600">Price Priority Rs.29</p>   
    <p className="font-bold">To pay on delivery Rs.176</p>   
    </div>
  </div>
}

function Header() {
  return (
    <header>
      <h1 className="text-3xl font-serif bg-pizza">🛒 My Store</h1>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/products">Products</Link> | 
        <Link to="/contact">Contact</Link> | 
        <Link to="/order">Order</Link> |
        <Link to="/orderSummary">Order Summary</Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <p>© 2025 My Store</p>
      <p>Follow us on Facebook | Twitter | Instagram</p>
      <LinkButton to='-1'>Go Back</LinkButton>
      <Loader/>
    </footer>
  );
}

function BackButton() {
  const navigate = useNavigate();
  return <button onClick={() => navigate(-1)}>🔙 Back</button>;
}

function Home() {
  return (
    <div>
      <h2>🏠 Home Page</h2>
      <p>Welcome to our store!</p>
      <LinkButton to="/products">Go to Products</LinkButton>
    </div>
  );
}

function Products() {
  const soldout = true;
  return (
    <div className="divide-y divide-stone-200 px-2 py-2 gap-3 flex flex-col">
      <h2>🛍️ Products Page</h2>
      <p>This is the products page.</p>
      <div className="flex  gap-4"><img src="../src/assets/images/food (1).jpg" alt="food 1" className="h-24 w-24"/>
      <div className="flex flex-col grow">
      <p className="font-medium">pizza</p>
      <span className="text-sm italic text-stone-500 capitalize">Vegetable pizza </span>
      <div className="flex items-center mt-auto  justify-between">
      <h2 className="mt-auto">15 dollar</h2>
      <button type='small' className="border-yellow-200 bg-yellow-500 rounded-full p-1 ">Add to cart</button>
      </div>
 
      </div>
    
      </div>
      <div className="flex  gap-4"><img src="../src/assets/images/food (2).jpg" alt="food 2" className={`h-24 w-24 ${soldout ?'opacity-40 grayscale'  : ''}`}/>
      <div className="flex flex-col grow">
      <p className="font-medium">burger</p>
      <span className="text-sm italic text-stone-500 capitalize">Vegetable burger </span>
      <div className="flex items-center mt-auto  justify-between ">
      <h2 className="mt-auto text-sm text-stone-500 font-medium uppercase">Sold Out</h2>
      <button type='small' className="border-yellow-200 bg-yellow-500 rounded-full p-1 ">Add to cart</button>

      </div>
     
      </div>
     
      </div>
      
      <BackButton />
      <LinkButton to="/">🏠 Home</LinkButton>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <h2>📞 Contact Page</h2>
      <p>This is the contact page.</p>
      <BackButton />
      <LinkButton to="/">🏠 Home</LinkButton>
    </div>
  );
}

function Order() {
  return (
    <div>
      <h2>🛒 Order Page</h2>
      <p >This is the order page.</p>
      <ul className="divide-y divide-black border-b border-t mt-3 mb-6">
      {
        Array.from({length:5}, (item, index) => <div className="flex sm:flex-col"><h1 className="py-1 basis-80 ">Order {index}</h1><button className=" mx-50 bg-yellow-400 rounded-2xl p-1 text-sm">delete</button></div>)
      }
      </ul>
      <p className="bg-red-100 text-red-700 text-center rounded-b-md font-bold">This is an error</p>

     
      <BackButton className='space-x-2'/>
      <LinkButton to="/" className='space-x-2'>🏠 Home</LinkButton>
    </div>
  );
}
