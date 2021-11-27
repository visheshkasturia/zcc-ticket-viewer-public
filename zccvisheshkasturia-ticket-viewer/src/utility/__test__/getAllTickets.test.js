import '@testing-library/jest-dom/extend-expect';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const lib = require('../getAllTickets');

const mockAxios = new MockAdapter(axios);

const tickets = [{
  id: '1', status: 'open', priority: 'high', subject: 'subject 1', created_at: '2021-10-08T13:23:23Z',
}, {
  id: '2', status: 'closed', priority: '', subject: 'subject 2', created_at: '2021-11-08T13:23:23Z',
}, {
  id: '3', status: 'open', priority: 'low', subject: 'subject 3', created_at: '2021-10-09T14:23:23Z',
}, {
  id: '4', status: 'closed', priority: 'normal', subject: 'subject 4', created_at: '2021-11-08T15:13:23Z',
}, {
  id: '5', status: 'open', priority: 'urgent', subject: 'subject 5', created_at: '2021-11-10T23:50:23Z',
}];

describe('getAllTickets api returned correct data for tickets', () => {
  mockAxios.onGet().reply(200, tickets);
  test('Data has correct length', () => lib.getAllTickets().then((res) => expect(res.data).toHaveLength(5)));
  test('Ticket1 has correct ID', () => lib.getAllTickets().then((res) => expect(res.data[0].id).toBe('1')));
  test('Ticket2 has correct status', () => lib.getAllTickets().then((res) => expect(res.data[1].status).toBe('closed')));
  test('Ticket3 has correct priority', () => lib.getAllTickets().then((res) => expect(res.data[2].priority).toBe('low')));
  test('Ticket4 has correct subject', () => lib.getAllTickets().then((res) => expect(res.data[3].subject).toBe('subject 4')));
  test('Ticket5 has correct date', () => lib.getAllTickets().then((res) => expect(res.data[4].created_at).toBe('2021-11-10T23:50:23Z')));
});
