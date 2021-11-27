import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import TicketDetails from '../TicketDetails';

afterEach(cleanup);
describe('TicketDetails renders correctly', () => {
  const ticketData = {
    id: 1,
    status: 'open',
    priority: 'urgent',
    subject: 'test subject',
    description: 'test description',
    requester_id: 'ABC123',
    assignee_id: 'XYZ456',
    organization_id: 'ORG789',
    created_at: '2021-12-01T17:53:53Z',
    updated_at: '2021-12-03T18:42:42Z',
  };

  it('id is correct', () => {
    const { getByTestId } = render(<TicketDetails ticket={ticketData} />);
    expect(getByTestId('details-id')).toHaveTextContent('1');
  });

  it('status is correct', () => {
    const { getByTestId } = render(<TicketDetails ticket={ticketData} />);
    expect(getByTestId('details-status')).toHaveTextContent('open');
  });

  it('priority is correct', () => {
    const { getByTestId } = render(<TicketDetails ticket={ticketData} />);
    expect(getByTestId('details-priority')).toHaveTextContent('urgent');
  });

  it('subject is correct', () => {
    const { getByTestId } = render(<TicketDetails ticket={ticketData} />);
    expect(getByTestId('details-subject')).toHaveTextContent('test subject');
  });

  it('desc is correct', () => {
    const { getByTestId } = render(<TicketDetails ticket={ticketData} />);
    expect(getByTestId('details-desc')).toHaveTextContent('test description');
  });

  it('created date is correct', () => {
    const { getByTestId } = render(<TicketDetails ticket={ticketData} />);
    expect(getByTestId('details-createdat')).toHaveTextContent('2021-12-01T17:53:53Z');
  });

  it('updated date is correct', () => {
    const { getByTestId } = render(<TicketDetails ticket={ticketData} />);
    expect(getByTestId('details-updatedat')).toHaveTextContent('2021-12-03T18:42:42Z');
  });

  it('assignee id is correct', () => {
    const { getByTestId } = render(<TicketDetails ticket={ticketData} />);
    expect(getByTestId('details-assignid')).toHaveTextContent('XYZ456');
  });

  it('requester id is correct', () => {
    const { getByTestId } = render(<TicketDetails ticket={ticketData} />);
    expect(getByTestId('details-reqid')).toHaveTextContent('ABC123');
  });

  it('org id is correct', () => {
    const { getByTestId } = render(<TicketDetails ticket={ticketData} />);
    expect(getByTestId('details-orgid')).toHaveTextContent('ORG789');
  });
  it('Matches snapshot', () => {
    const tree = renderer.create(<TicketDetails ticket={ticketData} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
