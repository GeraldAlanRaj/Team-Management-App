import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MemberDetails = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/members/${id}`)
      .then(res => setMember(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!member) return <p className="loading">Loading...</p>;

  return (
    <div className="details-card">
      <img src={`http://localhost:5001${member.profilePicture}`} alt="Profile" className="details-image" />
      <h2>{member.name}</h2>
      <p>Reg No: {member.regno}</p>
      <p>Experience: {member.experience}</p>
      <p>Skills: {member.skills}</p>
      <p>Projects: {member.projects}</p>
      <p>Hobbies: {member.hobbies}</p>
    </div>
  );
};

export default MemberDetails;
