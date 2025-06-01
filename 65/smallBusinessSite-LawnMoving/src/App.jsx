export default function App(){
  return <div> 
		<Header/>
		<Main/>
		<Quotes/>
		<PicSet1 />
		<PicSet2 />
		<Footer/>
	</div>
}

function Header(){
	return <div className="bg-green-200 p-5 flex justify-around items-center">
    <img src='./logo.jpeg' width={150} className="rounded-full"/>
    <h1 className="font-sans text-5xl font-semibold tracking-widest align-middle">LAWN MOWING COMPANY</h1>
   </div>
}

function Footer(){
	return <div className="bg-blue-500 h-[200px]"><a className="bg-slate-200" href="../paymentPage.html">Payment</a> </div>
}

function Main(){
	return <div className="flex gap-5 p-5">
		<div className="bg-blue-300 rounded-2xl p-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, quam?</div>
		<div className="bg-green-500 rounded-2xl p-3 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio cupiditate eaque porro laborum velit deserunt laboriosam magnam nesciunt, ab quisquam animi soluta facilis nostrum, totam dicta quasi natus. Saepe sapiente ullam voluptatem id obcaecati molestias sequi et dignissimos, accusamus, at doloribus dolore, quis nam possimus deserunt ab minus? Itaque, cupiditate.
			<h1 className="p-5 text-3xl">Phone No : +1 627 612 9612</h1>
		</div>
	</div>
}
function Quotes(){
	return <div className="flex gap-5 p-5">
		<div className="text-3xl bg-green-200 rounded-3xl p-5">“Kai Truex and Charlie Bullman" <br/>Mowing, pressue washing, and weed pulling
		 </div>
		<div className="text-6xl p-6 mx-10 bg-blue-500 rounded-4xl"> 
			”Free Estimate, just give us a Call”
		</div>
	</div>
}

function PicSet1(){
	return(
		<div className="p-10 flex gap-50">
			<div className="w-[100%]">
				<p className="text-6xl text-center">Before</p>
				<img src="before_1.jpeg" alt="before 1 pic"  className="border"/>
			</div>
			<div className="w-[100%]">
				<p className="text-6xl text-center">After</p>
				<img src="after_1.jpeg" alt="after 1 pic"  height={400} className="border h-[87%]"/>
			</div>
		</div>
	)
}


function PicSet2(){
	return(
		<div className="p-10 flex gap-50">
			<div className="w-[100%]">
				<p className="text-6xl text-center">Before</p>
				<img src="before_2.jpeg" alt="before 2 pic"  className="border w-[100%]"/>
			</div>
			<div className="w-[100%]">
				<p className="text-6xl text-center">After</p>
				<img src="after_2.jpeg" alt="after 2 pic"  height={400} className="border h-[87%]"/>
			</div>
		</div>
	)
}
