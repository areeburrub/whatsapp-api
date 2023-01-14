// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

const token = process.env.WHATSAPP_TOKEN;

export default function handler(req, res) {
  if (req?.method == 'GET') {

    const verify_token = process.env.VERIFY_TOKEN;

    // Parse params from the webhook verification request
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Check if a token and mode were sent
    if (mode && token) {
      // Check the mode and token sent are correct
      if (mode === "subscribe" && token === verify_token) {
        // Respond with 200 OK and challenge token from the request
        console.log("WEBHOOK_VERIFIED");
        res.status(200).send(challenge);
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.status(403);
      }
    }
   
  }
  else{
    console.log("incoming request : ",JSON.stringify(req.body, null, 2));
    if (req.body.object) {
      if (
        req.body.entry &&
        req.body.entry[0].changes &&
        req.body.entry[0].changes[0] &&
        req.body.entry[0].changes[0].value.messages &&
        req.body.entry[0].changes[0].value.messages[0]
      ) {
    let phone_number_id =req.body.entry[0].changes[0].value.metadata.phone_number_id;
    let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
    let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload


        var data = (number) => JSON.stringify({
          "messaging_product": "whatsapp",
          "recipient_type": "individual",
          "to": number,
          "type": "interactive",
          "interactive": {
            "type": "list",
            "header": {
              "type": "text",
              "text": "When Where What - Reminder Bot" 
            },
            "body": {
              "text": "This is the reminder bot working for WhenWhereWhat here to remind you of your upcoming events you have saved with us. https://wh3.link/testevent"
            },
            "footer": {
              "text": "WhenWhereWhat.one"
            },
            "action": {
              "button": "Change Reminder Settings",
              "sections": [
                {
                  "title": "Reminder Settings",
                  "rows": [
                    {
                      "id": "osmdfk",
                      "title": "1 Day",
                      "description": "Only Remind Me 1 Day Before"
                    },
                    {
                      "id": "mesdkfme",
                      "title": "1 Hour",
                      "description": "Only Remind Me 1 Hour Before"
                    }
                  ]
                }
              ]
            }
          }
        });

    axios({
      method: "POST", // Required, HTTP method, a string, e.g. POST, GET
      url:"https://graph.facebook.com/v12.0/" +phone_number_id +"/messages?access_token=" +token,
      data: data(from),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      console.log(response.data);
      res.status(200).json({ data: "success", response: response.data });
    }).catch((error) => {
      console.log(error);
      res.status(400).json({ data: "success", error: error });
    });
  }
      res.send(200);
}
else{

  res.status(400).json({ data: "success", error: "no object" });
}
  }
}
