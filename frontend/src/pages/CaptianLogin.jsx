import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';

const CaptianLogin = () => {
    const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [userdata, setUserdata] = useState(null);
        const SubmitHandler=(e)=>{
            e.preventDefault();
            const newUserdata = {
                email: email,
                password: password
            };
            setUserdata(newUserdata);
            console.log(newUserdata);
            setEmail('');
            setPassword('');
        }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
          <div>
            <img className='w-16 mb-10' src="https://pngimg.com/uploads/uber/small/uber_PNG24.png" alt="" />
    
            <form onSubmit={(e) => SubmitHandler(e)}>
              <h3 className='text-lg font-medium mb-2'>What's your email</h3>
              <input
                required
                className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder='email@example.com'
              />
    
              <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
    
              <input
                className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                required type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
              />
    
              <button
                className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
              >Login</button>
    
            </form>
            <p className='text-center'>Join a fleet? <Link to='/signup' className='text-blue-600'>Register as a Captain</Link></p>
          </div>
          <div>
            <Link
              to='/login'
              className='bg-[#fe7a2b] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            >Sign in as User</Link>
          </div>
        </div>
  )
}

export default CaptianLogin