import { DateTime } from '../node_modules/luxon/src/luxon.js';

export default () => {
  const dt = DateTime.now();
  const date = document.querySelector('.date');

  date.textContent = dt.toLocaleString(DateTime.DATETIME_MED);
};
