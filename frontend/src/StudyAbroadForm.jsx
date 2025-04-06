import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import logo from "./assets/university.jpg";
import ruLogo from "./assets/ru.png";

const StudyAbroadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    pincode: "",
    agreeTerms: false,
    ip: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api64.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        setFormData((prevData) => ({ ...prevData, ip: data.ip }));
      })
      .catch((error) => console.error("Error fetching IP:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    const mobileNumber = formData.mobile.replace(/\D/g, "").slice(-10);
    if (!/^\d{10}$/.test(mobileNumber)) {
      newErrors.mobile = "Mobile must be 10 digits";
    }
    if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    fetch("https://api.vidhyavaaradhi.com/home/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/home/thank-you");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("There was an error while sending your message. Please try again.");
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-12 py-6"
      style={{ backgroundImage: `url(${logo})` }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative w-full max-w-6xl flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-6">
        <div className="p-4 md:p-6 lg:p-8 text-white max-w-md md:w-1/2 z-10 text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold leading-snug">
            Take the First Step to <br />
            <span className="text-orange-500">STUDY ABROAD</span>
          </h1>
          <ul className="mt-4 space-y-3 text-lg">
            {["₹10L+ scholarships*", "Offer letter in 48 hrs*", "Expert guidance*", "Post-study work options*"].map((item, index) => (
              <li key={index} className="flex items-center justify-center md:justify-start">
                <span className="text-orange-400 text-xl md:text-2xl mr-2">✔</span> {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-row items-center space-x-4">
            <h2 className="text-lg font-semibold whitespace-nowrap">Premium Partner</h2>
            <img src={ruLogo} alt="University Logo" className="w-auto h-12 md:h-16 object-contain" />
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 md:p-8 rounded-lg shadow-xl w-full max-w-lg">
          <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-6">
            Start your Study Abroad Journey
          </h2>
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name*"
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address*"
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <PhoneInput
              country="in"
              value={formData.mobile}
              onChange={(value) => setFormData({ ...formData, mobile: value })}
              inputClass="!w-full py-4 !bg-transparent"
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}

            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              placeholder="Pincode*"
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
            {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}

            <div className="flex items-start text-sm">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className="mr-2 mt-1"
              />
              <span>
                I have read and agreed to{" "}
                <a href="/terms-and-conditions" className="text-blue-500 underline">T&C</a> and{" "}
                <a href="/privacy-policy" className="text-blue-500 underline">Privacy Policy</a>.
              </span>
            </div>
            {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded text-lg hover:bg-blue-600 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Book your free consultation"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudyAbroadForm;
