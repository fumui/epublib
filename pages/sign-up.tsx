import { FormEvent } from 'react'
import { useRouter } from 'next/router'
import { Container, TextField, Button, Typography, Link, Box, FormControl } from '@mui/material'
import { useAuth } from '../context/AuthContext';

const SignUpPage = () => {
  const router = useRouter()
  const { login } = useAuth();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    const response = await fetch('/api/v1/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    })

    if (response.ok) {
      const res = await response.json();
      login(res.data?.token, email as string);
      router.push('/');
    } else {
      alert('An error occurred');
    }
  }

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '98vh',
        padding: 4,
      }}
    >
      <FormControl
        component={'form'}
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          border: '1px solid #ccc',
          borderRadius: 2,
          backgroundColor: '#fff',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: 400,
        }}
      >
        <img src="/logo.png" alt="EPUBLib Logo" style={{ width: 100, marginBottom: 20 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          EPUBLib
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Create a new account
        </Typography>
        <TextField
          type="text"
          name="username"
          label="Username"
          variant="outlined"
          required
          sx={{ marginBottom: 2, width: '100%' }}
        />
        <TextField
          type="email"
          name="email"
          label="Email"
          variant="outlined"
          required
          sx={{ marginBottom: 2, width: '100%' }}
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          required
          sx={{ marginBottom: 2, width: '100%' }}
        />
        <TextField
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          required
          sx={{ marginBottom: 2, width: '100%' }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2, width: '100%' }}>
          Sign Up
        </Button>
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography variant="body2">
            <Link href="/login" sx={{ textDecoration: 'none' }}>
              Already have an account? Login
            </Link>
          </Typography>
        </Box>
      </FormControl>
    </Container>
  )
}

export default SignUpPage;