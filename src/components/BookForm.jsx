import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';

const BookForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publicationDate: '',
    isbn: '',
    genre: 'Fiction',
    rating: 1,
  });
  
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  // UseEffect hook to trigger alert when message changes
  useEffect(() => {
    if (message) {
      alert(message);
      setMessage('');
    }
  }, [message]);

  const validate = () => {
    let newErrors = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.author) newErrors.author = "Author is required.";
    if (!formData.publicationDate) newErrors.publicationDate = "Publication Date is required.";
    if (!formData.isbn || formData.isbn.length !== 13 || !/^\d+$/.test(formData.isbn)) newErrors.isbn = "ISBN must be a 13-digit number.";
    if (formData.rating < 1 || formData.rating > 5) newErrors.rating = "Rating must be between 1 and 5.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleBookSubmit(formData);
    }
  };


  const handleBookSubmit = async (bookData) => {
    // Send a POST request to the backend API to save the book in MongoDB
    try {
      await axios.post('https://bmsapp-production.up.railway.app/api/books', bookData);  // Backend API to save book
      setMessage('Book added successfully!');
      setFormData({
        title: '',
        author: '',
        publicationDate: '',
        isbn: '',
        genre: 'Fiction',
        rating: 1,
      });
    } catch (error) {
      setMessage('Failed to add book.');
    }

  };

  return (
    <div className="container mt-5">
      <h3>Add a Book</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label className='sub-heading'>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter book title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            maxLength="100"
          />
          {errors.title && <Alert variant="danger">{errors.title}</Alert>}
        </Form.Group>

        <Form.Group controlId="formAuthor">
          <Form.Label className='sub-heading'>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter author name"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            maxLength="50"
          />
          {errors.author && <Alert variant="danger">{errors.author}</Alert>}
        </Form.Group>

        <Form.Group controlId="formPublicationDate">
          <Form.Label className='sub-heading'>Publication Date</Form.Label>
          <Form.Control
            type="date"
            value={formData.publicationDate}
            onChange={(e) => setFormData({ ...formData, publicationDate: e.target.value })}
          />
          {errors.publicationDate && <Alert variant="danger">{errors.publicationDate}</Alert>}
        </Form.Group>

        <Form.Group controlId="formIsbn">
          <Form.Label className='sub-heading'>ISBN</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ISBN"
            value={formData.isbn}
            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
            maxLength="13"
          />
          {errors.isbn && <Alert variant="danger">{errors.isbn}</Alert>}
        </Form.Group>

        <Form.Group controlId="formGenre">
          <Form.Label className='sub-heading'>Genre</Form.Label>
          <Form.Control
            as="select"
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
          >
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>Mystery</option>
            <option>Fantasy</option>
            <option>Romance</option>
            <option>Sci-Fi</option>
            <option>Others</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formRating">
          <Form.Label className='sub-heading'>Rating</Form.Label>
          <Form.Control
            type="number"
            min="1"
            max="5"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          />
          {errors.rating && <Alert variant="danger">{errors.rating}</Alert>}
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Add Book
        </Button>
      </Form>
    </div>
  );
};

export default BookForm;
