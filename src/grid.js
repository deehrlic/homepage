// based off the start code at https://material-ui.com/components/tables/
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import PersistentDrawerBottom from './paper';

const months = ['January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August', 'September', 'October',
  'November', 'December'];

const useStyles = makeStyles({
  table: {
    width: 1000,
    marginTop: 60,
  },
});

/**
 *
 * @param {*} d1
 * @param {*} d2
 * @return {str} string
 */
function setD(d1, d2) {
  const d3 = new Date(d2);
  const d4 = new Date();
  d3.setDate(d3.getDate()+1);
  d4.setDate(d4.getFullYear()-1);
  if (d1.getDate() == d2.getDate() &&
  d1.getMonth() ==
  d2.getMonth() && d1.getFullYear() == d2.getFullYear()) {
    return 0;
  } else if (d1.getFullYear() == d2.getFullYear()) {
    return months[d2.getMonth()] + ' ' + d3.getDate();
  } else {
    return d2.getFullYear();
  }
}


/**
 *  @return {object} jsx
 * @param {props} props
 */
const EmailsList = (props) => {
  console.log(props.current);
  const classes = useStyles();
  const sorted = props.current;
  const [there, setThere] = React.useState(false);
  const [from, setFrom] = React.useState(null);
  const [subject, setSubject] = React.useState(null);
  const [recv, setRecv] = React.useState(null);

  /**
   * email scooper
   * @param {*} row
   */
  function scoopRow(row) {
    setThere(true);
    setFrom(row.from);
    setSubject(row.subject);
    setRecv(row.received);
  };

  /**
   * @return {jsx} jsx
   */
  return (
    <div>
      <TableContainer component={Paper} style={{height: '50vh'}}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {sorted.map((row) => (
              <TableRow key={row.id} onClick={() => scoopRow(row)}>
                <TableCell component="th" scope="row">
                </TableCell>
                <TableCell align="right">{row.from}</TableCell>
                <TableCell align="right">{row.subject}</TableCell>
                <TableCell align="right">
                  {setD(new Date(), new Date(row.received.slice(0, 10))) === 0 ?
                  row.received.slice(11, 16) :
                  setD(new Date(), new Date(row.received.slice(0, 10)))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PersistentDrawerBottom there={there}
        setThere={setThere} from={from} subject={subject} recv={recv}/>
    </div>
  );
};

EmailsList.propTypes = {
  list: PropTypes.object,
  current: PropTypes.array,
  default: PropTypes.array,
};

export default EmailsList;
