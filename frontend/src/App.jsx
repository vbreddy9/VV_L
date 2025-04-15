import React from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import StudyAbroadForm from "./StudyAbroadForm";
import WhyChooseUs from "./WhyChooseUs";
import AdvantageSection from "./AdvantageSection";
import UniversitySection from "./UniversitySection";
import TrainingPrograms from "./TrainingPrograms";
import SuccessStories from "./SuccessStories";
import FAQ from "./FAQ";
import StudyAbroad from "./StudyAbroad";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndConditions from "./TermsAndConditions";
import ThankYou from "./ThankYou";
import ConsentBanner from './ConsentBanner';

const Home = () => (
  <>
    <StudyAbroadForm />
    <WhyChooseUs />
    <AdvantageSection />
    <UniversitySection />
    <TrainingPrograms />
    <SuccessStories />
    <StudyAbroad />
    <FAQ />
    <ConsentBanner />
    <WhatsAppButton />
  </>
);

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home/privacy-policy" element={<Navigate to="/privacy-policy" />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/home/terms-and-conditions" element={<Navigate to="/terms-and-conditions" />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/home/thank-you" element={<Navigate to="/thank-you" />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
