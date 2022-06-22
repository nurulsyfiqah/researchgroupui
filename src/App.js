import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignUpPage'
import HomePage from './Pages/HomePage'
import ResearchPage from './Pages/ResearchPage'
import GroupsPage from './Pages/GroupsPage'
import GroupDashboardPage from "./Pages/GroupDashboardPage";
import TrackerPage from './Pages/TrackerPage'
import BlogPage from './Pages/BlogPage'
import EditPostPage from './Pages/EditPostPage'
import WebsitePage from './Pages/WebsitePage'
import ErrorPage from './Pages/ErrorPage'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import 'react-toastify/dist/ReactToastify.min.css'
import "./Assets/Styles/style.css"

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<LandingPage />}/>
              <Route path="/login" element={<LoginPage />}/>
              <Route path="/signup" element={<SignUpPage />}/>
              <Route path="/home" element={<HomePage />}/>
              <Route path="/research" element={<ResearchPage />}/>
              <Route path="/group" element={<GroupsPage />}/>
              <Route path="/group/:groupId" element={<GroupDashboardPage />}/>
              <Route path="/tracker" element={<TrackerPage />}/>
              <Route path="/blog" element={<BlogPage />}/>
              <Route path="/blog/edit/:blogId" element={<EditPostPage />}/>
              <Route path="/website" element={<WebsitePage />}/>
              <Route path="*" element={<ErrorPage />}/>
          </Routes>
      </Router>
  );
}

export default App;
