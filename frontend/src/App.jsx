import React, { useEffect } from "react";
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
  useEffect(() => {
    // Meta Pixel Code
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

    window.fbq("init", "1796342967894350");
    window.fbq("track", "PageView");
  }, []);

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
