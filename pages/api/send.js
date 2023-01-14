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
        "text": "<HEADER_TEXT>"
      },
      "body": {
        "text": "<BODY_TEXT>"
      },
      "footer": {
        "text": "<FOOTER_TEXT>"
      },
      "action": {
        "button": "<BUTTON_TEXT>",
        "sections": [
          {
            "title": "<LIST_SECTION_1_TITLE>",
            "rows": [
              {
                "id": "<LIST_SECTION_1_ROW_1_ID>",
                "title": "<SECTION_1_ROW_1_TITLE>",
                "description": "<SECTION_1_ROW_1_DESC>"
              },
              {
                "id": "<LIST_SECTION_1_ROW_2_ID>",
                "title": "<SECTION_1_ROW_2_TITLE>",
                "description": "<SECTION_1_ROW_2_DESC>"
              }
            ]
          },
          {
            "title": "<LIST_SECTION_2_TITLE>",
            "rows": [
              {
                "id": "<LIST_SECTION_2_ROW_1_ID>",
                "title": "<SECTION_2_ROW_1_TITLE>",
                "description": "<SECTION_2_ROW_1_DESC>"
              },
              {
                "id": "<LIST_SECTION_2_ROW_2_ID>",
                "title": "<SECTION_2_ROW_2_TITLE>",
                "description": "<SECTION_2_ROW_2_DESC>"
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