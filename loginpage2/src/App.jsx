import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To manage login status
  const [error, setError] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');

  const validUsername = 'login'; // Hardcoded valid username
  const validPassword = 'password123'; // Hardcoded valid password

  // Retrieve login state and subjects from localStorage when the app loads
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedSubjects = JSON.parse(localStorage.getItem('subjects'));

    if (storedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
    }

    if (storedSubjects) {
      setSubjects(storedSubjects);
    }
  }, []);

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    // Custom validation
    if (username === '' || password === '') {
      setError('Both username and password are required.');
      return;
    }

    // Check if entered credentials match the valid ones
    if (username === validUsername && password === validPassword) {
      setIsLoggedIn(true);
      setError('');
      // Store login state in localStorage
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleAddSubject = () => {
    if (!subject || !marks) {
      alert('Please fill in both subject and marks');
      return;
    }
    const newSubject = { subject, marks };
    const updatedSubjects = [...subjects, newSubject];
    setSubjects(updatedSubjects);

    // Store the updated subjects in localStorage
    localStorage.setItem('subjects', JSON.stringify(updatedSubjects));

    setSubject('');
    setMarks('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSubjects([]);
    localStorage.removeItem('isLoggedIn'); // Remove login state from localStorage
    localStorage.removeItem('subjects'); // Remove subjects from localStorage
  };

  return (
    <div className="App">
      {/* Login Form */}
      {!isLoggedIn ? (
        <div className="login-container">
          <div className="login-form">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLoginSubmit}>
              <div className="input-group">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        </div>
      ) : (
        // Subjects and Marks Form (After Login)
        <div className="subjects-container">
          <h2>Subjects and Marks</h2>
          <div className="add-subject-form">
            <input
              type="text"
              placeholder="Subject Name"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <input
              type="number"
              placeholder="Marks"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
            />
            <button onClick={handleAddSubject}>Add Subject</button>
            <button onClick={handleLogout}>Logout</button>
          </div>

          <div className="subjects-list">
            <h3>Subjects List</h3>
            <ul>
              {subjects.map((item, index) => (
                <li key={index}>
                  {item.subject} - {item.marks} Marks
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;