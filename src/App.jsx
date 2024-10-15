import React, { useState } from "react";

const initialData = [
  {
    lastName: "Navarro",
    firstName: "Justin John",
    course: "IT",
    birthdate: "2002-01-16",
  },
  {
    lastName: "James",
    firstName: "Lebron",
    course: "CS",
    birthdate: "1999-11-11",
  },
  {
    lastName: "Quibs",
    firstName: "Apollo",
    course: "IS",
    birthdate: "2000-05-02",
  },
  {
    lastName: "Morant",
    firstName: "Ja",
    course: "DS",
    birthdate: "1994-09-15",
  },
];

const calculateAge = (birthdate) => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

const DataTable = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const filteredData = data.filter((item) => {
    const birthdateWithinRange =
      (!minDate || new Date(item.birthdate) >= new Date(minDate)) &&
      (!maxDate || new Date(item.birthdate) <= new Date(maxDate));

    const matchesSearchTerm =
      item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calculateAge(item.birthdate).toString().includes(searchTerm);

    return birthdateWithinRange && matchesSearchTerm;
  });

  return (
    <div className="container">
      <h1 className="heading">Student Management System: Data Table</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <input
          type="date"
          placeholder="Min Date"
          value={minDate}
          onChange={(e) => setMinDate(e.target.value)}
          className="date-input"
        />

        <input
          type="date"
          placeholder="Max Date"
          value={maxDate}
          onChange={(e) => setMaxDate(e.target.value)}
          className="date-input"
        />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Course</th>
            <th>Birthdate</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.lastName}</td>
                <td>{item.firstName}</td>
                <td>{item.course}</td>
                <td>{item.birthdate}</td>
                <td>{calculateAge(item.birthdate)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">
                No matching data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
