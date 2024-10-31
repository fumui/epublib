import { FormEvent } from 'react'
import { useRouter } from 'next/router'
import { Container, TextField, Button, Typography, Link, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  logo: {
    width: 100,
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
    width: '100%',
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
  footer: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  link: {
    textDecoration: 'none',
  },
})

export default function LoginPage() {
  const classes = useStyles()
  const router = useRouter()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    const response = await fetch('/api/v1/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      router.push('/dashboard')
    } else if (response.status === 401) {
      alert('Invalid email or password')
    } else {
      alert('An error occurred')
    }
  }

  return (
    <Container className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <img src="/logo.png" alt="EPUBLib Logo" className={classes.logo} />
        <Typography variant="h4" component="h1" gutterBottom>
          EPUBLib
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Please enter your credentials to access the dashboard
        </Typography>
        <TextField
          type="email"
          name="email"
          label="Email"
          variant="outlined"
          required
          className={classes.input}
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          required
          className={classes.input}
        />
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Login
        </Button>
        <Box className={classes.footer}>
          <Typography variant="body2">
            <Link href="/forgot-password" className={classes.link}>
              Forgot Password?
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="/sign-up" className={classes.link}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </form>
    </Container>
  )
}