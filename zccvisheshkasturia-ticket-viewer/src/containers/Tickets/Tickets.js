import React, { useEffect, useState } from 'react';
import TicketCard from '../../components/TicketCard/TicketCard';
import { getAllTickets } from '../../utility/getAllTickets';
import './Tickets.css';

function Tickets({ name }) {
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(0);
  // getTickets sort by priority and set ticket state
  useEffect(() => {
    getAllTickets().then((response) => {
      if (response.data !== undefined) {
        const unshuffled = response.data.data;
        if (unshuffled !== undefined) {
          const order = ['low', 'normal', 'high', 'urgent'];
          const sortByPriority = unshuffled.sort((a, b) => (
            order.indexOf(b.priority) - order.indexOf(a.priority)));
          setTickets(sortByPriority);
        }
      }
    });
  }, []);
  // Pagination items per page
  const itemsPerPage = 25;
  // Handle next page - if there are more tickets remaining set next page
  const handleNextPage = () => {
    if (((page + 1) * itemsPerPage) < tickets.length) {
      setPage(page + 1);
    }
  };
  const handlePreviousPage = () => {
    if (page >= 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="tickets">
      <h1 className="userHeading"> Welcome {name} <br /> Thanks for making people happy, one customer at a time.</h1>
      <div className="pg-info">Page {page + 1}, Showing&nbsp;
        {tickets.slice(itemsPerPage * page, itemsPerPage * page + itemsPerPage).length}&nbsp;
        on this page, Total {tickets.length} Tickets
      </div>
      <div className="ticketContainer">
        <div className="id-box flex-center">Ticket ID</div>
        <div className="status-box flex-center">Status</div>
        <div className="priority-box flex-center">Priority</div>
        <div className="subject-box flex-center">Subject</div>
        <div className="date-box flex-center">Date</div>
      </div>
      {tickets.slice(itemsPerPage * page, itemsPerPage * page + itemsPerPage).map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
      <button id="prev-btn" className="nav-btn" type="button" onClick={handlePreviousPage}>Previous</button>
      <button id="next-btn" className="nav-btn" type="button" onClick={handleNextPage}>Next</button>
    </div>
  );
}

export default Tickets;
