import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { useNavigate, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  title: {
    padding: theme.spacing(2),
    borderBottom: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: '#222',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  code: {
    padding: theme.spacing(2),
    whiteSpace: 'pre-wrap',
    backgroundColor: '#222',
    color: '#fff',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderTop: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: '#333',
    color: '#ddd',
  },
  link: {
    color: '#fff',
  },
}));

const CodeCard = ({key,title, code, username, likes, post_location, user_location}) => {
  const classes = useStyles();
  const exampleCode = `function sayHello() {
  console.log("Hello, world!");
}`;
  const navigate = useNavigate();
{/* <Link to={`/profile/${value.UserId}`}> {value.username}</Link> */}
  return (
    <Paper className={classes.root} elevation={0}>
      <div className={classes.title}>
        <Typography variant="h6">{title}</Typography>
      </div>
      <div className={classes.code}>
        <Typography variant="body1" onClick={() => navigate(`/post/byId/${post_location}`)}>{code}</Typography>
      </div>
      <div className={classes.footer}>
        <Typography variant="body2" >
          <Link to={`/profile/${user_location}`} className={classes.link}>{username}</Link>
        </Typography>
        <Typography variant="body2">{likes}</Typography>
      </div>
    </Paper>
  );
};

export default CodeCard;
