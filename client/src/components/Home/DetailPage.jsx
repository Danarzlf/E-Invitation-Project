import React from "react";

const DetailPage = ({ foryousData, invitationDetail }) => {
  return (
    <div>
      <h1>Detail Page</h1>
      <p>Foryous data: {foryousData}</p>
      <p>Invitation detail: {invitationDetail}</p>
    </div>
  );
};

export default DetailPage;
