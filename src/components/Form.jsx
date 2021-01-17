import React, { useState } from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Fab, Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const API_BASE = 'http://localhost:8000';

function submitForm(contentType, data, setResponse) {
  axios({
    url: `${API_BASE}/muscle/`,
    method: 'POST',
    data,
    headers: {
      'Content-Type': contentType,
    },
  }).then((response) => {
    console.log(data);
    setResponse(response.data);
  }).catch((error) => {
    setResponse('error');
  });
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://twitter.com/juanpfrancos">
        Juanpfrancos
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const Form = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [insertion, setInsert] = useState('');
  const [innervation, setInnerv] = useState('');
  const [arterial, setArterial] = useState('');
  const [action, setAct] = useState('');
  const [image, setImage] = useState(null);
  const [visibility, setVisibility] = useState('hidden');
  const [imageURL, setimageURL] = useState('');

  function uploadWithFormData() {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('origin', origin);
    formData.append('insertion', insertion);
    formData.append('innervation', innervation);
    formData.append('arterial_supply', arterial);
    formData.append('action', action);
    formData.append('image', image);
    submitForm('multipart/form-data', formData, (msg) => console.log(msg));
  }

  const handleImage = (e) => {
    const reader = new FileReader();
    const imagen = e.target.files[0];

    reader.onloadend = () => {
      setImage(imagen);
      setimageURL(reader.result);
    };

    reader.readAsDataURL(imagen);
    setVisibility('visible');
  };
  const imgStyle = {
    visibility,
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Información de Músculo
        </Typography>
        <img style={imgStyle} src={imageURL} alt="Muscle picture" />
        <div>
          <input accept="image/*" style={{ display: 'none' }} id="icon-button-file" type="file" onChange={handleImage} />
          <label htmlFor="icon-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </div>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="outlined-basic"
            label="Nombre"
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); }}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="outlined-basic"
            label="Origen"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="outlined-basic"
            label="Inserción"
            value={insertion}
            onChange={(e) => setInsert(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="outlined-basic"
            label="Inervacion"
            value={innervation}
            onChange={(e) => setInnerv(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="outlined-basic"
            label="Acción"
            value={action}
            onChange={(e) => setAct(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="outlined-basic"
            label="Irrigación Sanguínea"
            value={arterial}
            onChange={(e) => setArterial(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={uploadWithFormData}
          >
            Enviar
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Form;
