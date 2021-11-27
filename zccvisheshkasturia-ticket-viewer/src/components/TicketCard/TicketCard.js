import React, { useState } from 'react';
import TicketDetails from '../TicketDetails/TicketDetails';
import './TicketCard.css';
import PopUp from '../PopUp/PopUp';

function TicketCard({ ticket }) {
  const [showDetails, setShowDetails] = useState(false);
  const handleShowDetails = (e) => {
    e.preventDefault();
    setShowDetails(!showDetails);
  };

  return (
    <div className="ticketContainer" onClick={handleShowDetails} onKeyDown={() => { setShowDetails(!showDetails); }} role="button" tabIndex={0}>
      <div data-testid="ticket-id-test" className="id-box flex-center">{ticket.id}</div>
      <div data-testid="ticket-status-test" className="status-box flex-center">{ticket.status}</div>
      <div data-testid="ticket-priority-test" className="priority-box flex-center">{ticket.priority}</div>
      <div data-testid="ticket-subject-test" className="subject-box flex-center">{ticket.subject}</div>
      <div data-testid="ticket-createdat-test" className="date-box flex-center">{ticket.created_at.slice(0, ticket.created_at.indexOf('T'))}</div>
      {showDetails
      && <PopUp content={<TicketDetails ticket={ticket} />} handleClose={handleShowDetails} />}
    </div>
  );
}

export default TicketCard;
