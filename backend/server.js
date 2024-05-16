const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/submit-form", (req, res) => {
  console.log(req.body);
  const { name, phone } = req.body;

  const transporter = nodemailer.createTransport({
    service: "yandex",
    auth: {
      user: "shamanic.love@yandex.ru",
      pass: "kgrjtmwpcddonweh",
    },
  });

  const mailOptions = {
    from: "shamanic.love@yandex.ru",
    to: "shamanic.love@yandex.ru", // Введите адрес получателя
    subject: "Новая заявка с формы",
    text: `Имя: ${name} \nТелефон: ${phone}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("Ошибка при отправке сообщения");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Сообщение успешно отправлено");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
