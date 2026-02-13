const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route to handle feedback
app.post("/send-feedback", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "manojnaik6355@gmail.com",
        pass: "utna bvcz chua irhu"
      }
    });

    // Email content
  const mailOptions = {
  from: `"Portfolio Feedback" <pavannaik300@gmail.com>`,
  replyTo: email,
  to: "pavannaik300@gmail.com",
  subject: "New Portfolio Feedback",
  text: `
Name: ${name}
Email: ${email}

Feedback:
${message}
  `
};


    await transporter.sendMail(mailOptions);
    res.send("Feedback sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending feedback");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
