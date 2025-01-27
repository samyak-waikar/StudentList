
import React, { useState, useEffect } from "react";
import { auth } from "../config/firebase"; 
import { signOut } from "firebase/auth"; 
import "./StudentsPage.css"; 
import { db } from "../config/firebase"; 
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const StudentsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentData, setStudentData] = useState({
    id: "",
    name: "",
    class: "",
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
  const [showModal, setShowModal] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const fetchStudents = async () => {
    const querySnapshot = await getDocs(collection(db, "students"));
    const studentList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStudents(studentList);
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "students"), studentData);
      setStudentData({
        id: "",
        name: "",
        class: "",
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
      setShowModal(false);
      fetchStudents(); 
    } catch (error) {
      console.error("Error adding student: ", error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await deleteDoc(doc(db, "students", id));
      fetchStudents(); 
    } catch (error) {
      console.error("Error deleting student: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      // window.location.href = "/StudentList/login"; 
      navigate("/login");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  useEffect(() => {
    fetchStudents(); 
  }, []);

  return (
    <div className={`students-page-container ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar">
        <h2>Dashboard</h2>
        <button onClick={fetchStudents}>Students Page</button>
        <button onClick={handleLogout}>Logout</button> {/* Updated logout button */}
        <button className="close" onClick={toggleSidebar}>×</button>
      </div>
      <div className="main-content">
        <button className="menu-button" onClick={toggleSidebar}>
          ☰
        </button>
        <h2>Students List</h2>
        <div className="button-container">
          <button className="add-student-button" onClick={() => setShowModal(true)}>Add Student</button>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Class</th>
                <th>Section</th>
                <th>Roll Number</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Parent's Name</th>
                <th>Parent's Phone</th>
                <th>Admission Date</th>
                <th>Date of Birth</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.class}</td>
                  <td>{student.section}</td>
                  <td>{student.rollNumber}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.address}</td>
                  <td>{student.parentName}</td>
                  <td>{student.parentPhone}</td>
                  <td>{student.admissionDate}</td>
                  <td>{student.dateOfBirth}</td>
                  <td>
                    <span onClick={() => alert(`Viewing ${student.name}`)}>🔍</span>
                    <span onClick={() => alert(`Editing ${student.name}`)}>✏️</span>
                    <span onClick={() => handleDeleteStudent(student.id)}>🗑️</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>×</span>
              <h2>Add Student</h2>
              <form onSubmit={handleAddStudent}>
                <input type="text" placeholder="ID" required value={studentData.id} onChange={(e) => setStudentData({ ...studentData, id: e.target.value })} />
                <input type="text" placeholder="Name" required value={studentData.name} onChange={(e) => setStudentData({ ...studentData, name: e.target.value })} />
                <input type="text" placeholder="Class" required value={studentData.class} onChange={(e) => setStudentData({ ...studentData, class: e.target.value })} />
                <input type="text" placeholder="Section" required value={studentData.section} onChange={(e) => setStudentData({ ...studentData, section: e.target.value })} />
                <input type="text" placeholder="Roll Number" required value={studentData.rollNumber} onChange={(e) => setStudentData({ ...studentData, rollNumber: e.target.value })} />
                <input type="email" placeholder="Email" required value={studentData.email} onChange={(e) => setStudentData({ ...studentData, email: e.target.value })} />
                <input type="text" placeholder="Phone" required value={studentData.phone} onChange={(e) => setStudentData({ ...studentData, phone: e.target.value })} />
                <input type="text" placeholder="Address" required value={studentData.address} onChange={(e) => setStudentData({ ...studentData, address: e.target.value })} />
                <input type="text" placeholder="Parent's Name" required value={studentData.parentName} onChange={(e) => setStudentData({ ...studentData, parentName: e.target.value })} />
                <input type="text" placeholder="Parent's Phone" required value={studentData.parentPhone} onChange={(e) => setStudentData({ ...studentData, parentPhone: e.target.value })} />
                <input type="date" placeholder="Admission Date" required value={studentData.admissionDate} onChange={(e) => setStudentData({ ...studentData, admissionDate: e.target.value })} />
                <input type="date" placeholder="Date of Birth" required value={studentData.dateOfBirth} onChange={(e) => setStudentData({ ...studentData, dateOfBirth: e.target.value })} />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsPage;
