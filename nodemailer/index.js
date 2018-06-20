var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testnodemisha@gmail.com',
    pass: 'Aa369852'
  }
});



// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

module.exports.confirm = (email, id) => {

  var mailOptions = {
    from: 'testnodemisha@gmail.com',
    to: email,
    subject: 'Sending Email for confirmation account',
    text: `http://localhost:3012/confirm${id}`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
