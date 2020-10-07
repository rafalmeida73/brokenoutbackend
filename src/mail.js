const mailer = require("nodemailer");
require('dotenv/config');


const sendEmail = (email, name, message) => {
    const smtpTransport = mailer.createTransport({
     host: 'smtp.mailtrap.io',
     port: 2525,
     auth: {
      user: "96ca577e3a2f3b",
      pass: "1f93be7ac57200"
  }
 })

 const mail = {
  from: email,
  to: "broken.out@ola.com",
  subject: `Broken Out`,
  text: `De: ${name}\nEmail: ${email}\nMensagem: ${message}`,
  html: `
  <div style="height: 10vh;">
      <center>
        <h1 style="color: #e10f4c">Broken Out</h1>
        <center>
      </div>
      <div>
        <h2>Contato Broken Out</h2>
      </div>
      <div>
        <fieldset>
          <legend>${name}</legend>
          <p>${message}</p>
        </fieldset>
      </div>
  `
}

return new Promise((resolve, reject) => {
  smtpTransport.sendMail(mail)
      .then(response => {
          smtpTransport.close();
          return resolve(response);
      })
      .catch(error => {
          smtpTransport.close();
          return reject(error);
      });
})
}

module.exports = { sendEmail }