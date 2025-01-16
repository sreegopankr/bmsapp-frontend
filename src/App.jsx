import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import BookForm from './components/BookForm';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import './App.css';

const App = () => {


  return (
    <Router>
      <div className="App">
        <div className="container">
          <h1 className="mt-5">Book Management System</h1>
          <Routes>
            {/* Route for Book List */}
            <Route path="/" element={<BookList />} />

            {/* Route for Add Book Form */}
            <Route path="/add-book" element={<BookForm />} />

            {/* Route for Book Details */}
            <Route path="/book/:bookId" element={<BookDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
