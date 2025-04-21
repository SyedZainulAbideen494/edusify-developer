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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/document/get-started" element={<ApiKeyDocs />} />
        <Route path="/document/api/quiz-topic" element={<QuizApiDocs />} />
        <Route path="/document/api/quiz-exam" element={<QuizApiDocsCompExam />} />
        <Route path="/document/api/pdf-to-quiz" element={<PdfQuizApiDocs />} />
        <Route path="/document/api/pdf-to-flashcard" element={<FlashcardApiDocs />} />
        <Route path="/document/api/quiz-from-text" element={<QuizFromTextDocs />} />
        <Route path="/document/api/flashcards-from-topic" element={<FlashcardsApiDocs />} />
        <Route path="/document/api/flashcards-from-text" element={<FlashcardsFromTextDocs />} />
        <Route path="/api-key" element={<ApiKeyPage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="*" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
