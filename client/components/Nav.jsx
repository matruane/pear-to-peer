import { useAuth0 } from '@auth0/auth0-react'
import { Link, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link as ReactLink } from 'react-router-dom'

import { IfAuthenticated, IfNotAuthenticated } from '@/components/Authenticated'

export default function Nav() {
  const { logout, loginWithRedirect } = useAuth0()

  function handleLogoff(e) {
    e.preventDefault()
    logout({ returnTo: window.location.origin })
  }

  function handleRegister(e) {
    e.preventDefault()
    loginWithRedirect({
      redirectUri: `${window.location.origin}/register`,
    })
  }

  function handleSignIn(e) {
    e.preventDefault()
    loginWithRedirect()
  }

  return (
    <>
      <VStack>
        <IfAuthenticated>
          <Link fontSize='2xl' as={ReactLink} to='/'>
            About Us
          </Link>
          <Link fontSize='2xl' as={ReactLink} to='/home'>
            Home
          </Link>
          <Link fontSize='2xl' as={ReactLink} to='/profile'>
            Profile
          </Link>
          <Link fontSize='2xl' as={ReactLink} to='/addfooditem'>
            Add Food
          </Link>
          <Link fontSize='2xl' as={ReactLink} to='/' onClick={handleLogoff}>
            Log Off
          </Link>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <Link fontSize='2xl' as={ReactLink} to='/' onClick={handleRegister}>
            Register
          </Link>
          <Link fontSize='2xl' as={ReactLink} to='/' onClick={handleSignIn}>
            Sign In
          </Link>
        </IfNotAuthenticated>
      </VStack>
    </>
  )
}
