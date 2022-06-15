import React,{useState,useEffect} from 'react';
//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import LandingPage from './Components/Landing/Landing';
import SigninPage from './Components/SignIn/Signin';
import SignUpPage from './Components/SignUp/SignUp';
import PretestPage from './Components/PreTest/Pretest';
import LettersPretestPage from './Components/LettersPretest/letterspretest';
import SentencesPage from './Components/SentencesTest/Sentences';
import WordsPage from './Components/Words/Words';
import StoriesPage from './Components/Stories/Stories';
import CompleteTestPage from './Components/Completetest/Completetest';
import ResetPasspage from './Components/ResetPassword/ResetPassword';
import IntelligencePage from './Components/IntelligenceTest/Intelligence';
import InventorytestPage from './Components/Inventorytest/Inventorytest';
import StartScreenPage from './Components/StartScreen/Startscreen';
import PostLettersPretestPage from './Components/PostTestLetters/Posttestletters';
import PostSentencesPage from './Components/PostSentences/PostSentence';
import PostWordsPage from './Components/PostWordsTest/Postwords';
import PostStoriesPage from './Components/PostStories/Poststories';
import CompletePostTestPage from './Components/Completetest/CompletePostTest';
import Notfoundpage from './Components/Notfound/Notfound';
import AboutPage from './Components/About/About';
import NavbarComp from './Components/SidebarComp/SideBar';
import ResultsShow from './Components/ResultToTeacher/Resultstech';
//import Authusercontext from './Components/AuthContext/Authcontext';
//import LmsPage from './Components/LMS/lms';
import Verify from './Components/Verify/Verify';

function App() {
  return (
    <Router>
      <NavbarComp />
      <Routes>
        <Route exact path="/" element={<LandingPage></LandingPage>}></Route>
        <Route exact path="/login" element={<SigninPage></SigninPage>}></Route>
        <Route exact path="/resetpass" element={<ResetPasspage></ResetPasspage>}></Route>
        <Route exact path="/create-account" element={<SignUpPage></SignUpPage>}></Route>
        <Route exact path='/aboutperuzor' element={<AboutPage></AboutPage>}></Route>
        <Route exact path="/notfound" element={<Notfoundpage></Notfoundpage>}></Route>
        <Route exact path="/startTest/:username" element={<StartScreenPage></StartScreenPage>}></Route>
        <Route exact path="/pretest/:username" element={<PretestPage></PretestPage>}></Route>
        <Route exact path="/letters-pretest/:username" element={<LettersPretestPage></LettersPretestPage>}></Route>
        <Route exact path="/Sentencetest/:username" element={<SentencesPage></SentencesPage>}></Route>
        <Route exact path="/Words/:username" element={<WordsPage></WordsPage>}></Route>
        <Route exact path="/Stories/:username" element={<StoriesPage></StoriesPage>}></Route>
        <Route exact path="/Quiz/:username" element={<IntelligencePage></IntelligencePage>}></Route>
        <Route exact path="/QuizInventory/:username" element={<InventorytestPage></InventorytestPage>}></Route>
        <Route exact path="/Postestltrs/:username" element={<PostLettersPretestPage></PostLettersPretestPage>}></Route>
        <Route exact path="/Postsentence/:username" element={<PostSentencesPage></PostSentencesPage>}></Route>
        <Route exact path="/Postwords/:username" element={<PostWordsPage></PostWordsPage>}></Route>
        <Route exact path="/Poststories/:username" element={<PostStoriesPage></PostStoriesPage>}></Route>
        <Route exact path="/TestOver/:username" element={<CompleteTestPage></CompleteTestPage>}></Route>
        <Route exact path="/TestOverpost/:username" element={<CompletePostTestPage></CompletePostTestPage>}></Route>
        <Route exact path="/ResultAccessTeacher/:username" element={<ResultsShow></ResultsShow>}></Route>
        <Route exact path="/Verify/:username" element={<Verify></Verify>}></Route>
        
      </Routes>
    </Router>
  );
}

export default App;
