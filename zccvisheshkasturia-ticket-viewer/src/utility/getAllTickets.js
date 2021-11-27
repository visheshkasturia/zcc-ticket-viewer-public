import axios from 'axios';

export const getAllTickets = async () => {
  const data = await axios({
    method: 'get',
    url: '/getAllTickets',
    responseType: 'json',
    headers: { 'Access-Control-Allow-Origin': '*' },
  })
    .then((response) => (response))
    .catch((err) => (err));
  return data;
};

export default getAllTickets;
