import React from 'react';
import './TicketDetails.css';

function TicketDetails({ ticket }) {
  return (
    <div className="ticketDetailsContainer">
      <div data-testid="details-id" className="id-details"><b>Ticket ID :</b> {ticket.id}</div>
      <div data-testid="details-reqid" className="req-details"><b>Requester ID :</b> {ticket.requester_id}</div>
      <div data-testid="details-assignid" className="assignee-details"><b>Assignee ID :</b> {ticket.assignee_id}</div>
      <div data-testid="details-orgid" className="org-details"><b>Organization ID :</b> {ticket.organization_id}</div>
      <div data-testid="details-createdat" className="created-details"><b>Date Created :</b> {ticket.created_at}</div>
      <div data-testid="details-updatedat" className="updated-details"><b>Date Updated :</b> {ticket.updated_at}</div>
      <div data-testid="details-status" className="status-details"><b>Ticket Status :</b> {ticket.status}</div>
      <div data-testid="details-priority" className="priority-details"><b>Ticket Priority :</b> {ticket.priority}</div>
      <div data-testid="details-subject" className="subject-details"><b>Subject :</b> {ticket.subject}</div>
      <div data-testid="details-desc" className="desc-details"><b>Description :</b> {ticket.description}</div>
    </div>
  );
}

export default TicketDetails;
