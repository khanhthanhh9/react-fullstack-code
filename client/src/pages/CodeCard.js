import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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
  },
  code: {
    padding: theme.spacing(2),
    whiteSpace: 'pre-wrap',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderTop: '1px solid',
    borderColor: theme.palette.divider,
  },
}));

const CodeCard = () => {
  const classes = useStyles();
  const exampleCode = `function sayHello() {
  console.log("Hello, world!");
}`;

  return (
    <Paper className={classes.root} elevation={0}>
      <div className={classes.title}>
        <Typography variant="h6">My Code</Typography>
      </div>
      <div className={classes.code}>
        <Typography variant="body1">{exampleCode}</Typography>
      </div>
      <div className={classes.footer}>
        <Typography variant="body2">Username: John Doe</Typography>
        <Typography variant="body2">Likes: 10</Typography>
      </div>
    </Paper>
  );
};

export default CodeCard;
