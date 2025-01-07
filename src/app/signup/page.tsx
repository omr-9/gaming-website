import React from 'react'
import SignUp from '../componants/forms/SignUp'

const signup = () => {
  return (
    <div className='min-h-screen w-full flex items-center justify-center'
    style={{backgroundImage:'url("/bg2.jpg")',
      backgroundSize:'cover',
      backgroundAttachment:'fixed',
      backgroundRepeat:'no-repeat'
    }}>
      <SignUp />
    </div>
  )
}

export default signup
