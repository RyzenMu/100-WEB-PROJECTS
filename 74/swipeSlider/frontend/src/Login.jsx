import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Login() {
    const location = useLocation();
    const html = location.state || {}
  return (
    <div dangerouslySetInnerHTML={{__html:html}}>
      
    </div>
  )
}
