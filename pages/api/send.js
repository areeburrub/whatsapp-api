// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

const token = process.env.WHATSAPP_TOKEN;

export default function handler(req, res) {

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
              "text": "WhenWhereWhat"
            },
            "action": {
              "button": "Reminder Settings",
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
    method: 'post',
    url: 'https://graph.facebook.com/v15.0/101047349368853/messages',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    data: data(919546557824)
  })
    .then(response => {
      console.log(response.data);
      res.status(200).json({ data: 'success' , response: response.data })
    })
    .catch(error => {
      console.log(error);
      res.status(400).json(error)
    });

}