import './App.css';

export default function App() {
  return (
    <div>
      <body className="bg-stone-700 text-xl text-stone-200 my-6">
        <h1 className="bg-yellow-400 text-center text-emerald-900 text-7xl font-extrabold uppercase tracking-[30px] mb-4 sm:text-red-600 lg:text-blue-600 md:text-black" >
          Hello Tailwind 
        </h1>
        <input type='text' className='w-50 h-9 bg-amber-100 rounded-2xl focus:outline-none focus:ring-8 focus:ring-white focus:ring-offset-8 disabled: cursor-not-allowed'/>
        <div className='md:flex items-center justify-around'>
          <div className='text-sm text-blue-200 hover:text-black hover:underline hover:text-5xl'>Menu-Left</div>
          <div className='bg-yellow-400 text-black inline-block rounded-full px-2 hover:bg-yellow-300 transition-colors duration-300 focus:ring-offset-8 focus:ring-yellow-300'>Menu-Right</div>
        </div>
        <h2 className='text-center space-y-80 sm:text-sm md:text-xl lg:text-5xl text-sm h-[200px] overflow-scroll max-w-[600px]'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto hic
          repellat molestiae ratione nulla odio delectus, ullam laboriosam
          asperiores quasi eius pariatur. Sunt, doloribus odit.
        </h2>
        <h3 className="bg-white text-stone-700 text-5xl border-b-8 border-red-800 py-4 px-4 hidden">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
          doloribus quasi voluptatibus ab nulla? Aliquid in ipsam quisquam.
          Nihil temporibus voluptas consequuntur ipsa beatae fugit. Doloribus
          sapiente porro nostrum suscipit sint consequatur? Cumque totam optio
          obcaecati nulla reprehenderit eligendi sed? Iste iusto temporibus
          corporis eveniet officia porro beatae illo velit?
        </h3>
        <div className='grid h-40 grid-row-4 grid-cols-[auto_2fr_auto] gap-4 bg-black gap-x-3 gap-y-3 mx-auto'>
          <h1 className='text-7xl border-2'>this is h1</h1>
          <h2 className='text-5xl border-2'>this is h2</h2>
          <h3 className='text-3xl border-2'>this is h3</h3>
          <h4 className='text-sm border-2 h-[300px] overflow-scroll'>this is h4</h4>
          <h4 className='text-sm border-2'>this is h4</h4>
          <h4 className='text-sm border-2'>this is h4</h4>
          <h4 className='text-sm border-2 h-screen mx-auto my-10'>this is h4</h4>
        </div>
      </body>
    </div>
  );
}
