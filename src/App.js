import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignUpPage'
import ForgotPasswordPage from './Pages/ForgotPasswordPage'
import HomePage from './Pages/HomePage'
import ResearchPage from './Pages/ResearchPage'
import EditPublicationPage from './Pages/EditPublicationPage';
import GroupsPage from './Pages/GroupsPage'
import GroupDashboardPage from "./Pages/GroupDashboardPage";
import TrackerPage from './Pages/TrackerPage'
import ViewGrpTrackerPage from "./Pages/ViewGrpTrackerPage";
import BlogPage from './Pages/BlogPage'
import EditPostPage from './Pages/EditPostPage'
import WebsitePage from './Pages/WebsitePage'
import WebPage from './Pages/Public/WebPage'
import PublicationPage from './Pages/Public/PublicationPage'
import GroupPage from './Pages/Public/GroupPage'
import ArticleListPage from './Pages/Public/ArticleListPage' 
import ArticlePage from './Pages/Public/ArticlePage'
import ErrorPage from './Pages/ErrorPage'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import 'react-toastify/dist/ReactToastify.min.css'
import "./Assets/Styles/style.css"

function App() {
    ReactSession.setStoreType("localStorage");

  return (
      <Router>
          <Routes>
              { /*user route*/ }
              <Route path="/" element={<LandingPage />}/>
              <Route path="/login" element={<LoginPage />}/>
              <Route path="/signup" element={<SignUpPage />}/>
              <Route path="/forgotpassword" element={<ForgotPasswordPage />}/>
              <Route path="/home" element={<HomePage />}/>
              <Route path="/research" element={<ResearchPage />}/>
              <Route path="/research/add" element={<ResearchPage />}/>
              <Route path="/research/verify" element={<ResearchPage />}/>
              <Route path="/publication" element={<EditPublicationPage />}/>
              <Route path="/group" element={<GroupsPage />}/>
              <Route path="/group/:groupId" element={<GroupDashboardPage />}/>
              <Route path="/tracker" element={<TrackerPage />}/>
              <Route path="/tracker/:trackerId" element={<ViewGrpTrackerPage />}/>  
              <Route path="/blog" element={<BlogPage />}/>
              <Route path="/blog/edit/:blogId" element={<EditPostPage />}/>
              <Route path="/website" element={<WebsitePage />}/>
              { /*public route*/ }
              <Route path="/:username" element={<WebPage />} />
              <Route path="/:username/home" element={<WebPage />} />
              <Route path="/:username/publication" element={<PublicationPage />} />
              <Route path="/:username/team" element={<GroupPage />} />
              <Route path="/:username/article" element={<ArticleListPage />} />
              <Route path="/:username/:articleid" element={<ArticlePage />} />
              <Route path="*" element={<ErrorPage />}/>
          </Routes>
      </Router>
  );
}

export default App;