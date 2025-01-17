import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(`http://localhost:8080/api/books`);
      const data = await response.json();

      // console.log(`here: ${process.env.REACT_APP_API_URL}`)
      console.log(data)
      
      // Calculate total pages based on the data length
      const totalBooks = data.length;
      const booksPerPage = 10;
      setTotalPages(Math.ceil(totalBooks / booksPerPage));

      // Calculate the starting index for the current page
      const startIndex = (page - 1) * booksPerPage;
      
      // Get the books for the current page (slice the data array)
      const booksForPage = data.slice(startIndex, startIndex + booksPerPage);

      setBooks(booksForPage);

    };

    fetchBooks();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await fetch(`http://localhost:8080/api/books/${id}`, { method: 'DELETE' });
      setBooks(books.filter(book => book.id !== id));
    }
  };

  return (
    <div className="container mt-5 ">
      <div className='flex-container'>
        <h3>Book List</h3>
        <Link to={`/add-book`} className="btn btn-success ml-4">Add New Book</Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
          <th>Nos</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Publication Date</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{index+1}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.publicationDate}</td>
              <td>{book.rating} ⭐</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(book.id)} className='dltButton'>Delete</Button>
                <Link to={`/book/${book.id}`} className="btn btn-info ml-4 detailButton">View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div>
        <Button disabled={page === 1} onClick={handlePrevPage}>Previous</Button>
        <span className="mx-2">Page {page} of {totalPages}</span>
        <Button disabled={page === totalPages} onClick={handleNextPage}>Next</Button>
      </div>
    </div>
  );
};

export default BookList;
