import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";

import Login from "./auth/login";
import SignUp from "./auth/signup";
import DashboardPage from "./dashboard/dashboard";
import QuizApiDocs from "./Documentation/quizGenDoc";
import QuizApiDocsCompExam from "./Documentation/examQuizDoc";
import PdfQuizApiDocs from "./Documentation/quizGEnPdfDoc";
import QuizFromTextDocs from "./Documentation/quizgenfromtextdoc";
import FlashcardsApiDocs from "./Documentation/faslhcardGenDoc";
import FlashcardApiDocs from "./Documentation/flashcardGenFromPDfDoc";
import FlashcardsFromTextDocs from "./Documentation/flashcardFromTextDoc";
import ApiKeyPage from "./api key/genKey";
import BillingPage from "./billing/billing";
import ApiKeyDocs from "./Documentation/getStarted";
import ScrollToTop from "./app_modules/ScrolloTop";
import ForgotPassword from "./auth/forgot-password";
import ResetPassword from "./auth/ResetPassword"
import WhyEdusifyAPI from "./Documentation/WhyEdusifyAPI";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="*" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
