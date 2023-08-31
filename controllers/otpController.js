
import fetch from 'node-fetch';

exports.otpEvent = async (req,res) => {
    try {
      const { toNumber } = req.body;
  
      if (!toNumber) {
        return res.status(400).json({ error: 'Phone number is required' });
      }
  
      const randomNumber = generateRandomSixDigitNumber();
  
      const resp = await fetch(
        `https://us.sms.api.sinch.com/xms/v1/${process.env.SERVICE_PLAN_ID}/batches`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + process.env.API_TOKEN,
          },
          body: JSON.stringify({
            from: process.env.SINCH_NUMBER,
            to: [toNumber],
            body: `Your OTP is ${randomNumber}`,
          }),
        }
      );
  
      const data = await resp.json();
      console.log(data);
  
      res.status(200).json({ message: `OTP sent successfully ${randomNumber}` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  
  }