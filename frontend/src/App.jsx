import { Navigate, Route, Routes ,useLocation} from "react-router";
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
  const {pathname}=useLocation();
  return (
    <Box position={'relative'} minH="100vh">
    <Container 
      maxW={pathname==='/' ? {base:'100%',sm:'540px',md:'900px',lg:'1000px'} : {base:'100%',sm:'540px',md:'720px'}} 
      px={{ base: 3, sm: 4, md: 6 }} 
      py={{ base: 3, sm: 4, md: 6 }}
    >
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
