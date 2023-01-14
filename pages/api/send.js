// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

const token = process.env.WHATSAPP_TOKEN;

export default function handler(req, res) {

  axios({
    method: 'post',
    url: 'https://graph.facebook.com/v15.0/101047349368853/messages',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    data: {
      messaging_product: "whatsapp",
      to: from,
      type: "interactive",
      interactive: {
        type: "list",
        headers: {
          text: "When Where What - All in one link for calendars",
        },
        body: {
          text: "When Where What - All in one link for calendars",
        },
        footer: {
          text: "message from WhenWhereWhat.one",
        },
        action: {
          buttons: "Call to Action",
          sections: [
            {
              title: "WhenWhereWhat.one",
              rows: [
                {
                  id: "1",
                  title: "titke goes here",
                  description: "description goes here",
                }
              ]
            }
          ]
        }
      },
    }
  })
    .then(response => {
      console.log(response.data);
      res.status(200).json({ data: 'success' , response: response.data })
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ data: 'success' , error: error })
    });

}