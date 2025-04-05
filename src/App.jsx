// creates a new folder called "server" and changes the directory to it
// --> mkdir server && cd server

// this initializes a new Node.js project by creating a package.json file
// without asking any questions
// --> npm init -y

// express - a lightweight web framework for Node.js
// it is able to build APIs web servers easily
// routes loike GET (Purpose: Used to request data from a server.) /users or 
// POST (Purpose: Used to send data to the server to create or update a resource.) /upload

// multer - Middleware for handling file uploads (e.g. images, PDFs) in multipart/form-data format.
// Commonly used with Express for uploading files from a form or frontend.

// cors - Stands for Cross-Origin Resource Sharing.
// Lets your server accept requests from other domains (like http://localhost:3000 calling an API on http://localhost:5000).
// Super useful for frontend/backend projects.

// openai - Official OpenAI API client.
// Lets you interact with OpenAI models (like ChatGPT or DALL·E) from your Node.js app.

//pdf-parse - A library to extract text and metadata from PDF files.
// Useful if you're uploading PDFs and need to read their contents in your backend.
// --> npm install express multer cors openai pdf-parse

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import ResumePage from './components/ResumePage';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChevYou from './components/ChevYou';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <main className="pt-24">
          <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn />} />

            <Route path="/hero" element={<Hero />} />
            {/* <Route path="/signin" element={<SignIn />} /> */}
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/chevyou" element={<ChevYou />} />
            <Route path="dash" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;