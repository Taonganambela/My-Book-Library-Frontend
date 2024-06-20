import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar, Tooltip } from '@mui/material';
import axios from 'axios';

interface Book {
  author: string;
  book: string;
  number: string;
}

const App: React.FC = () => {
  const [form, setForm] = useState<Book>({ author: '', book: '', number: '' });
  const [books, setBooks] = useState<Book[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<{ message: string, visible: boolean }>({ message: '', visible: false });
  const [myBool, setMyBool]= useState(false);

 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editIndex !== null) {
      try {
        await axios.put(`http://localhost:50/Book/update/${books[editIndex].number}`, form);
        const updatedBooks = books.map((book, index) => (index === editIndex ? form : book));
        setBooks(updatedBooks);
        setEditIndex(null);
        showSnackbar('Book updated successfully');
      } catch (error) {
        showSnackbar('Failed to update book');
        console.error('Error updating book:', error);
      }
    } else {
      try {
        await axios.post(`http://localhost:50/Book/saveBook`, form);
        setBooks([...books, form]);
        setMyBool(!myBool);
        showSnackbar('Book added successfully');
      } catch (error) {
        showSnackbar('Failed to add book');
        console.error('Error adding book:', error);
      }
    }
    setForm({ author: '', book: '', number: '' });
  };

  const handleEdit = (index: number) => {
    setForm(books[index]);
    setEditIndex(index);
  };

  const handleDelete = async (index: number) => {
    try {
      await axios.delete(`http://localhost:50/Book/delete/${books[index].number}`);
      const updatedBooks = books.filter((_, i) => i !== index);
      setBooks(updatedBooks);
      if (editIndex === index) {
        setForm({ author: '', book: '', number: '' });
        setEditIndex(null);
      }
      showSnackbar('Book deleted successfully');
    } catch (error) {
      showSnackbar('Failed to delete book');
      console.error('Error deleting book:', error);
    }
  }; 
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:50/Book/getAll');
        setBooks(response.data);
      } catch (error) {
        showSnackbar('Failed to fetch books');
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, [myBool]);


  const showSnackbar = (message: string) => {
    setSnackbar({ message, visible: true });
    setTimeout(() => {
      setSnackbar({ message: '', visible: false });
    }, 3000);
  };

  return (
    <div className='p-4'>
      <p className='text-center py-[10px] pb-[30px] font-bold text-[30px]'>My Book Library</p>
  
      <form onSubmit={handleSubmit}>
        <div className='flex-col center-items justify-center space-y-4 sm:flex-col sm:center-items sm:justify-center sm:pace-y-4 md:flex md:flex-row md:space-y-0 md:space-x-28'>
          <div className='flex flex-col'>
            <label htmlFor="book" className='font-bold'>Book Title</label>
            <input
              type="text"
              id="book"
              name="book"
              value={form.book}
              onChange={handleChange}
              required
              placeholder='e.g Who ate my cheese'
              className='border-black border rounded-lg h-10 px-4 hover:border-black active:border-black'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="author" className='font-bold'>Author's Name </label>
            <input
              type="text"
              id="author"
              name="author"
              value={form.author}
               placeholder='e.g Spencer Johnson'
              onChange={handleChange}
              required
              className='border-black border rounded-lg h-10 px-4 hover:border-black active:border-black'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="number" className='font-bold'>ISBN(Optional)</label>
            <input
              type="text"
              id="number"
              name="number"
              value={form.number}
              placeholder='e.g 0-399-14444-59A'
              onChange={handleChange}
              className='border-black border rounded-lg h-10 px-4 hover:border-black active:border-black'
            />
          </div>
         
  
         
        </div> 
        <br/>
         <div className='flex flex-col justify-center items-center mt-2 mb-2'>
            <button type="submit" className='bg-black text-white w-[130px] py-2 rounded-lg'>
              {editIndex !== null ? 'Update' : 'Add'}
            </button>
          </div>
      </form>

      {books.length > 0 && (
        <div className='mt-[100px] text-center justify-center center-items flex'>
          <TableContainer component={Paper} className='w-[1200px]'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className='font-bold'>Book Title</TableCell>
                  <TableCell className='font-bold'>Author's name</TableCell>
                  <TableCell className='font-bold'>ISBN</TableCell>
                  <TableCell className='font-bold'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((book, index) => (
                  <TableRow key={index}>
                    <TableCell>{book.book}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.number}</TableCell>
                    <TableCell>
                    <Tooltip title="Edit">
                        <button 
                          onClick={() => handleEdit(index)} 
                          className='text-blue-600 hover:text-blue-900'>
                          <EditNoteIcon />
                        </button>
                      </Tooltip>
                      {' '}
                      <Tooltip title="Delete">
                        <button 
                          onClick={() => handleDelete(index)} 
                          className='text-red-600 hover:text-red-900'>
                          <DeleteIcon />
                        </button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      <Snackbar
        open={snackbar.visible}
        message={snackbar.message}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ message: '', visible: false })}
      />
    </div>
  );
};

export default App;
