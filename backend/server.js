const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const axios = require("axios");
const requestIp = require("request-ip");

const app = express();

app.use(cors({
  origin: "https://abroad.vidhyavaaradhi.com",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

app.use(bodyParser.json());
app.use(requestIp.mw());

app.get("/home", (req, res) => {
  console.log("GET /home: Health check");
  res.status(200).json("Server running");
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vidhyavaaradioverseas@gmail.com",
    pass: "iyxy lefz dyfy bbso", // App password
  },
});

const sendAutoReply = async (userEmail, userName) => {
  const mailOptions = {
    from: `"Vidhyavaaradhi Overseas Consultancy" <info@vidhyavaaradhi.com>`,
    to: userEmail,
    subject: "Thank You for Your Interest!",
    html: `<div style="max-width: 600px; margin: auto; padding: 30px; font-family: 'Segoe UI', sans-serif; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.08);">
  <div style="padding: 20px; background-color: #ffffff; border-radius: 8px;">
    <h2 style="color: #2e5aac;">Hello ${userName},</h2>
    <p style="font-size: 16px; color: #333;">
      Thank you for reaching out to <strong style="color: #2e5aac;">Vidhyavaaradhi Overseas Consultancy</strong>!
    </p>
    <p style="font-size: 16px; color: #333;">
      We're excited to connect with you and will get in touch shortly to assist with your study abroad journey.
    </p>
    <div style="background-color: #ffffff; margin-top: 25px; padding: 25px 20px; border-radius: 8px;">
    <h3 style="color: #2e5aac; margin-bottom: 15px;">🌟 Why Choose Us?</h3>
    <ul style="list-style: none; padding-left: 0; color: #333; font-size: 15px;">
      <li>✅ Expert guidance for top universities</li>
      <li>🎓 Scholarship opportunities</li>
      <li>⚡ Quick offer letter processing</li>
      <li>🛂 Assistance with visa & accommodation</li>
    </ul>
  </div>
    <div style="margin-top: 25px; padding: 15px; background-color: #f1f5ff; border-left: 4px solid #2e5aac; border-radius: 5px;">
      <p style="margin: 0; font-size: 15px;">📞 Call us anytime:</p>
      <p style="margin: 0;"><strong><a href="tel:+919100050502" style="color: #2e5aac; text-decoration: none;">+91 91000 50502</a></strong></p>
      <p style="font-size: 15px; color: #333;">🌐 Visit our website: <a href="https://abroad.vidhyavaaradhi.com" target="_blank" style="color: #2e5aac; text-decoration: underline;">Vidhyavaaradhi Overseas Consultancy</a></p>
    </div>
  </div>

  <div style="margin-top: 30px; text-align: center; font-size: 13px; color: #888;">
    <p style="margin-bottom: 6px;">&copy; ${new Date().getFullYear()} Vidhyavaaradhi Overseas Consultancy</p>
    <p style="margin-bottom: 6px;"><a href="https://abroad.vidhyavaaradhi.com/terms-and-conditions" style="color: #888; text-decoration: underline;">Terms & Conditions</a> | <a href="https://abroad.vidhyavaaradhi.com/privacy-policy" style="color: #888; text-decoration: underline;">Privacy Policy</a></p>
    <p>Hyderabad, India</p>
  </div>
</div>
`,
  };
  await transporter.sendMail(mailOptions);
};

const notifyAdmin = async (formData) => {
  const mailOptions = {
    from: `"Vidhyavaaradhi Overseas Consultancy" <vidhyavaaradioverseas@gmail.com>`,
    to: "vidhyavaaradioverseas@gmail.com",
    subject: "New Lead - Study Abroad",
    html: `<div style="max-width: 600px; margin: auto; padding: 30px; font-family: 'Segoe UI', sans-serif; background-color: #f4f6f8; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
  <div style="background-color: #ffffff; padding: 25px 20px; border-radius: 8px;">
    <h2 style="color: #2e5aac; margin-bottom: 20px;">📩 New Inquiry Details</h2>

    <p style="font-size: 15px; color: #333;"><strong>Name:</strong> ${formData.name}</p>
    <p style="font-size: 15px; color: #333;"><strong>Email:</strong> ${formData.email}</p>
    <p style="font-size: 15px; color: #333;"><strong>Mobile:</strong> ${formData.mobile}</p>
    <p style="font-size: 15px; color: #333;"><strong>Pincode:</strong> ${formData.pincode}</p>
    <p style="font-size: 15px; color: #333;"><strong>IP Address:</strong> ${formData.ip}</p>
  </div>
  <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;" />
  <p style="font-size: 15px; color: #d32f2f; font-weight: bold; margin-bottom: 10px;">
    Note: Please follow up with this lead at the earliest.
  </p>
  <div style="margin-top: 30px; text-align: center; font-size: 13px; color: #888;">
    <p style="margin-bottom: 6px;">&copy; ${new Date().getFullYear()} Vidhyavaaradhi Overseas Consultancy</p>
    <p style="margin-bottom: 6px;">
      <a href="https://abroad.vidhyavaaradhi.com/terms-and-conditions" style="color: #888; text-decoration: underline;">Terms & Conditions</a> | 
      <a href="https://abroad.vidhyavaaradhi.com/privacy-policy" style="color: #888; text-decoration: underline;">Privacy Policy</a>
    </p>
    <p>Hyderabad, India</p>
  </div>
</div>
`,
  };
  await transporter.sendMail(mailOptions);
};

app.post("/home/send-email", async (req, res) => {
  const { name, email, mobile, pincode } = req.body;

  if (!name || !email || !mobile || !pincode) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const ipRes = await axios.get("https://api64.ipify.org?format=json");
    const ip = ipRes.data.ip;
    const fullData = { ...req.body, ip };

    await sendAutoReply(email, name);
    await notifyAdmin(fullData);

    res.status(200).json({ message: "Emails sent successfully" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = app;
