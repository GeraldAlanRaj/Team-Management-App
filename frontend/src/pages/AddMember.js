import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMember = () => {
  const [formData, setFormData] = useState({
    name: "",
    regno: "",
    profilePicture: null,
    experience: "",
    skills: "",
    projects: "",
    hobbies: ""
  });
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) data.append(key, formData[key]);

    await axios.post("http://localhost:5001/api/members", data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {Object.entries(formData).map(([field, value]) => (
        <div key={field} className="form-group">
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          {field === "profilePicture" ? (
            <input type="file" name={field} onChange={handleChange} />
          ) : (
            <input name={field} value={value} onChange={handleChange} />
          )}
        </div>
      ))}
      <button type="submit" className="btn submit">Add Member</button>
    </form>
  );
};

export default AddMember;