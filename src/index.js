import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import emails from './data/emails.json';

/**
 * @param {object} date to be trimmed
 * @return {string} ISO date with the seconds trimmed off
 */
function trimSeconds(date) {
  return new Date(date).toISOString().split('.')[0] +'Z';
}

/**
 * @return {string} one month and two days ago
 */
function lastMonth() {
  const date = new Date();
  date.setMonth(date.getMonth()-1);
  date.setDate(date.getDate()-2);
  return new Date(date);
}

/**
 * @return {string} one week ago
 */
function lastWeek() {
  const date = new Date();
  date.setDate(date.getDate()-7);
  return new Date(date);
}

let id = emails.length+1;

emails.push({
  id: id++,
  from: 'Bob Dylan',
  email: 'bob@bob.com',
  subject: 'Fancy a brew tonight?',
  received: trimSeconds(new Date()),
});

emails.push({
  id: id++,
  from: 'Lt. Dish',
  email: 'ltdish@mash4077.dod.gov',
  subject: 'Meet me in the supply room?',
  received: trimSeconds(lastWeek()),
});

emails.push({
  id: id++,
  from: 'Big Bird',
  email: 'bigbird@pbs.org',
  subject: 'Have you seen my car keys??',
  received: trimSeconds(lastMonth()),
});

ReactDOM.render(<App/>, document.getElementById('root'));
