import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewMembers = () => {
  const [members, setMembers] = useState([]);

  const fetchMembers = () => {
    axios.get("http://localhost:5001/api/members")
      .then(res => setMembers(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      await axios.delete(`http://localhost:5001/api/members/${id}`);
      fetchMembers();
    }
  };

  return (
    <div className="card-container">
      {members.map(member => (
        <div key={member._id} className="card">
          <img src={`http://localhost:5001${member.profilePicture}`} alt="Profile" className="details-image" />
          <h2>{member.name}</h2>
          <p>Reg No: {member.regno}</p>
          <div className="card-buttons">
            <Link to={`/member/${member._id}`} className="btn">Details</Link>
            <button className="btn delete" onClick={() => handleDelete(member._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewMembers;
