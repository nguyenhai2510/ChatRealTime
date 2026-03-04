import { BrowserRouter, Route, Routes } from "react-router";
import SignUpPage from "./pages/SignUpPage.js";
import SignInPage from "./pages/SignInPage.js";
import ChatAppPage from "./pages/ChatAppPage.js";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          {/* Public routrs */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />

          {/* Private routes */}
          <Route path="/chat" element={<ChatAppPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
