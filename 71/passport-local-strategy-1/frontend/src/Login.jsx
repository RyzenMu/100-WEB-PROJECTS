import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { data } from 'react-router-dom'

export default function Login() {
  const [html, setHtml] = useState("")
  useEffect(function(){
    fetch("http://localhost:3000/api")
    .then(res => res.text())
    .then(data => setHtml(data))
  }, [])
  return (
    <div dangerouslySetInnerHTML={{__html: html}}>
      
    </div>
  )
}
