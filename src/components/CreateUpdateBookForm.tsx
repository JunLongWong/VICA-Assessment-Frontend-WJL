import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { Box, Container } from '@mui/material';
import { useCreateBookMutation, useGetBookQuery, useUpdateBookMutation } from '../redux/Api/api';


type Props = {
  action: string
  data?: string // _id of selected row for Update feature
}


const CreateUpdateBookForm: any = ({ action, data }: Props) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [published_year, setPublishedYear] = useState<number>(1990);
  const [quantity, setQuantity] = useState<number>(1);
  const [createBook, { isError: isBookCreationError, isSuccess: isCreateBookSuccess, isLoading: isCreateBookLoading }] = useCreateBookMutation();
  const [updateBook, { isError: isUpdateBookError, isSuccess: isUpdateBookSuccess, isLoading: isUpdateBookLoading }] = useUpdateBookMutation();
  console.log("selected row data _id: ", data)

  const {
    data: bookData,
    isLoading: isLoadingBook,
    error,
    isError,
    isSuccess: getBookSuccess
  } = useGetBookQuery(data ?? "", {
    skip: !data,
  });

  useEffect(() => {
    if (bookData) {
      setTitle(bookData.Book.title)
      setDescription(bookData.Book.description)
      setAuthor(bookData.Book.author)
      setGenre(bookData.Book.genre)
      setPublishedYear(bookData.Book.published_year)
      setQuantity(bookData.Book.quantity)
    }
  }, [])


  const handleTitleChange = (e: any) => {
    setTitle(e.target.value)
  }
  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value)
  }
  const handleGenreChange = (e: any) => {
    setGenre(e.target.value)
  }
  const handleYearChange = (e: any) => {
    console.log(typeof e.target.value)
    setPublishedYear(Number(e.target.value))
  }
  const handleAuthorChange = (e: any) => {
    setAuthor(e.target.value)
  }
  const handleQtyChange = (e: any) => {
    setQuantity(Number(e.target.value))
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    {
      action === 'create' && await createBook({
        title: title,
        description: description,
        genre: genre,
        author: author,
        published_year: published_year,
        quantity: quantity
      })
    }

    {
      action === 'update' && getBookSuccess && await updateBook({
        _id: bookData?.Book._id,
        title: title,
        description: description,
        genre: genre,
        author: author,
        published_year: published_year,
        quantity: quantity
      })
    }

    setOpen(false)
  }

  return (
    <div>
      {action === 'update' && (
        <Tooltip title="Update">
          <IconButton onClick={handleClickOpen}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}

      {action === 'create' && (
        <Tooltip title={`Add `}>
          <IconButton onClick={handleClickOpen}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Book Management</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {action.charAt(0).toUpperCase() + action.slice(1)} book
          </DialogContentText>
        </DialogContent>
        <Container>
          <Box component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} autoComplete="on" onSubmit={handleSubmit}>
            <TextField
              variant="standard"
              name="title"
              label="Title"
              autoFocus
              value={title}
              onChange={handleTitleChange}
              required
            />
            <TextField
              variant="standard"
              name="description"
              label="Description"
              autoFocus
              value={description}
              onChange={handleDescriptionChange}
              required
            />
            <TextField
              variant="standard"
              name="genre"
              label="Genre"
              autoFocus
              value={genre}
              onChange={handleGenreChange}
              required
            />
            <TextField
              variant="standard"
              name="author"
              label="Author"
              autoFocus
              value={author}
              onChange={handleAuthorChange}
              required
            />
            <TextField
              variant="standard"
              name="year"
              label="Year"
              autoFocus
              value={published_year}
              onChange={handleYearChange}
              type="number"
              required
            />
            <TextField
              variant="standard"
              name="quantity"
              label="Quantity"
              type="number"
              autoFocus
              value={quantity}
              onChange={handleQtyChange}
              required
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">{action}</Button>
            </DialogActions>
          </Box>
        </Container>
      </Dialog>
    </div>
  );
}

export default CreateUpdateBookForm
