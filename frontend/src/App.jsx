import React from "react";
import { Navigate, Route, Routes } from "react-router";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import { Box, Container } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { userAtom } from "./atoms/userAtom";
import { useRecoilValue } from "recoil";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";
import ChatPage from "./pages/ChatPage";

const App = () => {
  const user = useRecoilValue(userAtom);
  return (
    <Box position={'relative'}>
    <Container maxW="620px" px={{ base: 4, md: 4 }} py={{ base: 4, md: 6 }}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to={"/auth"} />}
        />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/update"
          element={user ? <UpdateProfilePage /> : <AuthPage />}
        />

        <Route
          path="/:username"
          element={
            user ? (
              <>
                
                <UserPage /> 
                <CreatePost />
              </>
            ) : (
              <UserPage />
            )
          }
        />
        <Route
          path="/:username/post/:pId"
          element={user ? <PostPage /> : <Navigate to={"/auth"} />}
        />
        <Route path="/chat" element={user ?<ChatPage/>:<Navigate to={"/auth"}/>}/>
      </Routes>
    </Container>
    </Box>
  );
};

export default App;
