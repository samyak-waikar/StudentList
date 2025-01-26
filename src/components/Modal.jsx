
import React, { useState } from "react";
import { db } from "../config/firebase"; 
import { collection, addDoc } from "firebase/firestore";

const Modal = ({ isOpen, onClose }) => {
  const [studentData, setStudentData] = useState({
    id: "",
    name: "",
    className: "",
    section: "",
    rollNumber: "",
    email: "",
    phone: "",
    address: "",
    parentName: "",
    parentPhone: "",
    admissionDate: "",
    dateOfBirth: "",
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "students"), studentData); 
      alert("Student added successfully!");
      onClose(); 
      setStudentData({
        id: "",
        name: "",
        className: "",
        section: "",
        rollNumber: "",
        email: "",
        phone: "",
        address: "",
        parentName: "",
        parentPhone: "",
        admissionDate: "",
        dateOfBirth: "",
      }); 
    } catch (error) {
      console.error("Error adding student: ", error);
      alert("Error adding student. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Add Student</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={studentData.id}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={studentData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="className"
            placeholder="Class"
            value={studentData.className}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="section"
            placeholder="Section"
            value={studentData.section}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="rollNumber"
            placeholder="Roll Number"
            value={studentData.rollNumber}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={studentData.email}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={studentData.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={studentData.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="parentName"
            placeholder="Parent's Name"
            value={studentData.parentName}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="parentPhone"
            placeholder="Parent's Phone"
            value={studentData.parentPhone}
            onChange={handleChange}
          />
          <input
            type="date"
            name="admissionDate"
            placeholder="Admission Date"
            value={studentData.admissionDate}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            value={studentData.dateOfBirth}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
