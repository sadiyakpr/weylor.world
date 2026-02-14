import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  const [mode, setMode] = useState('Login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    agree: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      agree: false,
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (mode === 'Sign Up' && !formData.agree) {
      setError('You must agree to the terms')
      return
    }

    setLoading(true)
    try {
      mode === 'Login' ? await loginUser() : await signupUser()
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const loginUser = async () => {
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })

    const data = await response.json()

    if (data.success) {
      localStorage.setItem('auth-token', data.token) 
      if (data.role) 
        {
          localStorage.setItem('role', data.role) // ✅ store role + 
          }
          window.location.replace('/')
    } else {
      setError(data.errors || 'Login failed')
    }
  }

  const signupUser = async () => {
    const response = await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }),
    })

    const data = await response.json()

    if (data.success) {
     localStorage.setItem('auth-token', data.token) 
     if (data.role) 
      {
        localStorage.setItem('role', data.role) // ✅ store role
     }
     window.location.replace('/')
    } else {
      setError(data.errors || 'Signup failed')
    }
  }

  return (
    <div className="loginsignup">
      <form className="loginsignup-container" onSubmit={handleSubmit}>
        <h1>{mode}</h1>

        {error && <p className="error-text">{error}</p>}

        <div className="loginsignup-fields">
          {mode === 'Sign Up' && (
            <input
              type="text"
              name="username"
              placeholder="Your Name"
              value={formData.username}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            minLength="6"
            required
          />
        </div>

        {mode === 'Sign Up' && (
          <div className="loginsignup-agree">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            <p>
              I agree to the <strong>Terms</strong> &{' '}
              <strong>Privacy Policy</strong>.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || (mode === 'Sign Up' && !formData.agree)}
        >
          {loading ? 'Please wait...' : 'Continue'}
        </button>

        {mode === 'Sign Up' ? (
          <p className="loginsignup-login">
            Already have an account?{' '}
            <span onClick={() => { setMode('Login'); resetForm() }}>
              Login here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{' '}
            <span onClick={() => { setMode('Sign Up'); resetForm() }}>
              Click here
            </span>
          </p>
        )}
      </form>
    </div>
  )
}

export default LoginSignup
