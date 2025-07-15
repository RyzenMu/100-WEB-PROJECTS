import React from 'react'

export default function Protected() {
  return (
    <div>
      <form action={'http://localhost:3000/api/userLogin'} method='post'>
        <label htmlFor='username'>username</label>
        <input name='username' placeholder='username' required/>
        <label htmlFor='password'>password</label>
        <input type='password' name='password' placeholder='password'/>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}
