import { useState } from "react"
import { Link } from "react-router-dom"
import Swal from 'sweetalert2';
import axios from "axios"
import { setProfileData , resetProfileData } from '../../../store/slices/userProfileSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.withCredentials = true

const baseURL = import.meta.env.VITE_BASE_URL

const client = axios.create({
  baseURL: baseURL
})

function AdminLogin() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [validEmail , setValidEmail] = useState(true)
  const [validPassword , setValidPassword] = useState(true)

  function emailHandler(e)
  {
    setEmail(e.target.value)
    if(email.split('@').length > 1)
    {
      setValidEmail(false)
    }
  }

  function passwordHandler(e)
  {
    setPassword(e.target.value)
    if(password.length > 8)
    {
      setValidPassword(false)
    }
  }
  function handleSubmit(e)
  {
    e.preventDefault()
    console.log({
      email:email,
      password:password
    })
    client.post("/users/admin/login/",
    {
      email:email,
      password:password
    }).then((res)=>{
      console.log(res.data.message)
      console.log(JSON.stringify(res.data.data))
      
      // localStorage.setItem("jwt",res.data.jwt)
      navigate('/admin/users')
      Swal.fire({
        icon:'success',
        title:"Welcome boss",
        timer:2000
      })

      dispatch(setProfileData(res.data.data))
      // navigate('/')
    }).catch((err)=>{
      console.log(err.response.statusText)
      Swal.fire({
        icon:'error',
        text:"invalid email or passwerd",
        timer:2000
      })
    })
    console.log("Email : " + email )
    console.log("Password : " + password )
  }

  return (
    <>
      <section className="h-screen flex flex-col justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <h1 className="block text-blue-700 text-3xl font-bold">Admin Login</h1>
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
          className="my-10" />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" type="text" placeholder="Email Address" onChange={emailHandler}/>
        {validEmail && email && <p className="text-red-500">Invalid Email</p>}
        <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" type="password" placeholder="Password" onChange={passwordHandler}/>
        {validPassword && password && <p className="text-red-500">Invalid Password</p>}
        <div className="mt-4 flex justify-between font-semibold text-sm">
        </div>
        <div className="text-center md:text-left">
          <button className="mx-auto bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit" onClick={handleSubmit} disabled={validPassword && validEmail}>Login</button>
        </div>
        <Link to='/register'/>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don&apos;t have an account? <p className="text-red-600 hover:underline hover:underline-offset-4" href="#"
          disabled={validEmail || validPassword}
          >Register</p>
        </div>
      </div>

    </section>
    </>
  )
}

export default AdminLogin