import React from "react";

function PublicationListView({ publication }) {
  const { id, title, description, minOffer } = publication;
  return (
    <div>
      <li key={id} className="list-group-item">
        <div>
          {title}
          <br />
          {description}
          <br />
          {minOffer}
        </div>
      </li>
    </div>
  );
}

export default PublicationListView;
