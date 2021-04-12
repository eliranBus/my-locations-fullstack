import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  categories: {
    width: '350px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '4em',
    borderRadius: '5px'
  },
  locations: {
    width: '1180px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '1em',
    marginBottom: '3em',
    boxShadow: '0 9px 28px rgb(0 0 0 / 30%)',
    borderRadius: '5px',
  }
}));