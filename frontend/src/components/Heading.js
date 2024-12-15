import React from "react";
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(() => ({
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    margin: '20px 0',
  },
  parallelogramContainer: {
    position: 'relative',
    overflow: 'hidden',
    margin: '20px auto',
    lineHeight:1,
    transform: 'skew(-20deg)',
    backgroundColor: '#3b5998',
    display: 'inline-block',
    alignItems: 'center',
    fontSize:'1.1rem',
    padding:'5px 13px',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  line: {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: '1.5px',
    backgroundColor: 'black',
    zIndex: 0,
  },
}));
const Heading = ({title}) => {
    const classes = useStyles();
	return (
		<header>
		<div className={classes.titleContainer}>
        <div className={classes.line} />
        <h1 className={classes.parallelogramContainer}>{title}</h1>
      </div>
		</header>
	);
};

export default Heading;