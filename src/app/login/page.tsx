import React from 'react'
import Login from '../componants/forms/Login'

const login = () => {
  return (
    <main className='min-h-screen w-full flex items-center justify-center'
     style={{
        backgroundImage:'url("/background.jpg")',
        backgroundSize:'cover',
        backgroundAttachment:'fixed',
        backgroundRepeat:'no-repeat'
    }}>
      <Login />
    </main>
  )
}

export default login
