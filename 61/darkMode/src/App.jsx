import { useState } from 'react'
import './App.css'

export default function App(){
  const src = 'https://picsum.photos/200/300'
  const [dark, setDark]= useState(false)
  console.log(dark)
  return <div className={dark ? "darkmode" : ''}>
    <img src={src} width={400}/>
    <img src={src} width={400}/>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam commodi quis voluptatibus itaque fugit voluptatem dolores excepturi eaque quae reprehenderit minus repellendus, odit corrupti ex sapiente dolorem totam quos? Omnis vero error sapiente quo quos, non, doloribus voluptas est, autem labore eum iusto. Magni, commodi natus eum voluptatibus iusto modi?</p>
    <button onClick={()=> setDark(d => !d)}>
      {dark ? 'click for light mode' : 'click for dark mode'}
    </button>
  </div>
}