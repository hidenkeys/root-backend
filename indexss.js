// // Find your Service Plan ID and API Token at dashboard.sinch.com/sms/api/rest
// // Find your Sinch numbers at dashboard.sinch.com/numbers/your-numbers/numbers
// const SERVICE_PLAN_ID = '16fdc48193e0410dabeb3b8b62ce3278';
// const API_TOKEN = '6e97a3f291cd439a8065e8921ad3919d';
// const SINCH_NUMBER = '+447520651528';
// const TO_NUMBER = '+2349019971557';

// import fetch from 'node-fetch';



// async function run() {
//   const resp = await fetch(
//     'https://us.sms.api.sinch.com/xms/v1/' + SERVICE_PLAN_ID + '/batches',
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + API_TOKEN
//       },
//       body: JSON.stringify({
//         from: '+447520651528',
//         to: ["+2349019971557"],
//         body: `your OTP is ${randomNumber}`
//       })
//     }
//   );

//   const data = await resp.json();
//   console.log(data);
// }

// run();


// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilio = require('twilio');
const client = new twilio.Twilio(accountSid, authToken);


client.messages
  .create({
     body: `your OTP is ${randomNumber}`,
     from: '+15017122661',
     to: '+2348156572209'
   })
  .then(message => console.log(message.sid))
  .done();

  console.log(process.env.TWILIO_ACCOUNT_SID)
