import React from "react";

function PublicationListView({ publication }) {
  const { id, title, description, minOffer } = publication;
  return (
    <li key={id} className="list-group-item">
      <div>
        {title}
        <br />
        {description}
        <br />
        {minOffer}
      </div>
    </li>
  );
}

export default PublicationListView;
