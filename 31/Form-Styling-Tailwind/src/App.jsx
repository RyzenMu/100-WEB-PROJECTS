import './App.css'
import Button from './Button'
export default function App(){
  return <div>
    <header className='bg-yellow-400 flex justify-evenly h-15 items-center'>
      <h1 className='text-3xl'>Fast react Pizza Co</h1>
      <input type='text' placeholder='search' className='bg-white placeholder:text-red-400 rounded-full h-7 p-2 focus:w-76 transition-all duration-600 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-3 focus:ring-opacity-50'/>
    </header>
    <main>
      <div>
      <label >Firstname</label>
      <input type='text' className='border-2 mx-3 my-3 input' /></div>
      <div>
      <label >Phonenumber</label>
      <input type='text' className='border-2 mx-3 my-3 input' /></div>
      <label >Address</label>
      <input type='text' className='border-2 mx-3 my-3 w-full' />
      <div>
        <input type='checkbox' name = 'priority' id='priority' className='border-2 w-7 h-4 accent-yellow-400 focus: outline-none focus:ring focus: ring-yellow-400 focus: ring-offset-2' />
        <label className='mx-1'>Want to give your order priority</label>
      </div>
      <div>
        <button className='rounded-full p-2 m-2 bg-yellow-400'>Order Now</button>
        <button className='btn'>Order Now 1</button>
      </div>
      <Button> Order Now 2</Button>
      <Button> Order Now 3</Button>
      <Button> Order Now 4</Button>
      <Button> Order Now 5</Button>
      <Button> Order Now 6</Button>
    </main>
  </div>
}