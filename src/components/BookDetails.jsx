import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, Card, Button } from 'react-bootstrap';
import axios from 'axios';

const BookDetails = () => {
  const { bookId } = useParams();
  console.log(bookId)
  const id = bookId;
  const [book, setBook] = useState(null);
  const [externalData, setExternalData] = useState(null);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`https://bmsapp-production.up.railway.app/api/books/${id}`);
        setBook(response.data);

        const externalResponse = await axios.get(`https://bmsapp-production.up.railway.app/api/books/details/${response.data.isbn}`);
        const externalItems = externalResponse.data.items || [];
        if (externalItems.length > 0) {
          const externalData = externalItems[0].volumeInfo;
          setExternalData(externalData);
        } else {
          setExternalData(null);
        }
      } catch (error) {
        console.error("Error fetching book data:", error);
        setExternalData(null);
      }
    };

    fetchBookData();
  }, [bookId]);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h3>{book.title} - Details</h3>

      <Tabs defaultActiveKey="basic" id="book-details-tabs">
        <Tab eventKey="basic" title="Basic Details">
          <Card>
            <Card.Body>
              <Card.Text><span className='sub-heading'>Title: </span>{book.title}</Card.Text>
              <Card.Text><span className='sub-heading'>Author:</span> {book.author}</Card.Text>
              <Card.Text><span className='sub-heading'>Genre: </span>{book.genre}</Card.Text>
              <Card.Text><span className='sub-heading'>Publication Date: </span>{book.publicationDate}</Card.Text>
              <Card.Text><span className='sub-heading'>ISBN: </span> {book.isbn}</Card.Text>
              <Card.Text><span className='sub-heading'>Rating: </span>{book.rating}</Card.Text>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="moreDetails" title="More Details">
          {externalData && (
            <Card>
              <Card.Body>
                <Card.Title>Description</Card.Title>
                {externalData.description && (
                  <Card.Text>{externalData.description}</Card.Text>
                )}
                
                {externalData.imageLinks && externalData.imageLinks.thumbnail && (
                  <img src={externalData.imageLinks.thumbnail} alt={book.title} width="200" />
                )}
              </Card.Body>
            </Card>
          )}
        </Tab>
      </Tabs>

      <Link to="/" className="btn btn-secondary mt-3">Back to Book List</Link>
    </div>
  );
};

export default BookDetails;
