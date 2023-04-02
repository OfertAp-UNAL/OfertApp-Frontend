import React from "react";

function PublicationListView({ publication }) {
  const { id, title, description, minOffer } = publication;
  return (
    <li key={id} className="list-group-item">
      <div>
        <img src="https://picsum.photos/200" alt="Random 200x200 image" />

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
