import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import TicketCard from '../TicketCard';

afterEach(cleanup);
describe('TicketCard renders correctly', () => {
  const ticketData = {
    id: 1,
    status: 'open',
    priority: 'urgent',
    subject: 'test subject',
    created_at: '2021-12-01T17:53:53Z',
  };

  it('id is correct', () => {
    const { getByTestId } = render(<TicketCard ticket={ticketData} />);
    expect(getByTestId('ticket-id-test')).toHaveTextContent('1');
  });

  it('status is correct', () => {
    const { getByTestId } = render(<TicketCard ticket={ticketData} />);
    expect(getByTestId('ticket-status-test')).toHaveTextContent('open');
  });

  it('priority is correct', () => {
    const { getByTestId } = render(<TicketCard ticket={ticketData} />);
    expect(getByTestId('ticket-priority-test')).toHaveTextContent('urgent');
  });

  it('subject is correct', () => {
    const { getByTestId } = render(<TicketCard ticket={ticketData} />);
    expect(getByTestId('ticket-subject-test')).toHaveTextContent('test subject');
  });

  it('date is correct', () => {
    const { getByTestId } = render(<TicketCard ticket={ticketData} />);
    expect(getByTestId('ticket-createdat-test')).toHaveTextContent('2021-12-01');
  });

  it('Matches snapshot', () => {
    const tree = renderer.create(<TicketCard ticket={ticketData} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
