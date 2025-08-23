import React from 'react'
import { useNavigate } from 'react-router-dom'
const CaptainLogout = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
     axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
         headers: {
             Authorization: `Bearer ${localStorage.getItem('token')}`
         }
     })
     .then(response => {
         if (response.status === 200) {
             localStorage.removeItem('token')
             navigate('/captain-login')
         }
     })
     .catch(err => {
         console.log(err);
         localStorage.removeItem('token')
         navigate('/captain-login')
     })
  }

  return (
    <div>
      <h1>Captain Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default CaptainLogout