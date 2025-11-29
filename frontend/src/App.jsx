import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import UserPage from './pages/UserPage'
import PostPage from './pages/PostPage'
import Header from './components/Header'
import { Container } from '@chakra-ui/react'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import { userAtom } from './atoms/userAtom'
import { useRecoilValue } from 'recoil'
import LogoutButton from './components/LogoutButton'
import UpdateProfilePage from './pages/UpdateProfilePage'
import CreatePost from './components/CreatePost'

const App = () => {
  const user=useRecoilValue(userAtom)
  return (
    <Container 
      maxW="620px" 
      px={{ base: 4, md: 4 }}
      py={{ base: 4, md: 6 }}
    >
      <Header />
      <Routes>
        <Route path="/" element ={user ?<HomePage/>:<Navigate to={'/auth'}/> }/>
        <Route path="/auth" element={!user ? <AuthPage />:<Navigate to={'/'}/>} />
        <Route path='/update' element={user ? <UpdateProfilePage/> : <AuthPage/>}/>

        <Route path="/:username" element={user ? <UserPage />:<Navigate to={'/auth'}/> }/>
        <Route path="/:username/post/:pId" element={ user ? <PostPage />:<Navigate to={'/auth'}/> } />
      </Routes>
      {user &&<LogoutButton />}
      {user && <CreatePost />}
    </Container>
  )
}

export default App