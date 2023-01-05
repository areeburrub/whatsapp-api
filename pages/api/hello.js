// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

export default function handler(req,res) {
  //fetch some sample data from an external API usign axios
  axios.get('https://jsonplaceholder.typicode.com/users')
  .then(response => {
    console.log(response.data);
    res.status(200).json({ data: response.data })
  })
}
