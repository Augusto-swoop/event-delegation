import { useRef, useState } from 'react';
import { debounce } from 'lodash'
import Styles from './Styles';
import data from '../data.json';

const RowsSelector = ({ rows, onChange }) => {
  return (
    <span>
      <label>
        Showing
          <input type="number" min={0} max={10000} step={1000} onChange={onChange} value={rows} />
        of 10000 rows
      </label>
    </span>
  )
}

const Header = () => (
  <tr>
    <th>Id</th>
    <th>Job Title</th>
    <th>Email Address</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>University</th>
    <th>Country</th>
    <th>IBAN</th>
    <th>Car Model</th>
  </tr>
)

const Row = ({ row }) => (
  <tr>
    <th>{row.ID}</th>
    <th>{row.JobTitle}</th>
    <th>{row.EmailAddress}</th>
    <th>{row.FirstName}</th>
    <th>{row.LastName}</th>
    <th>{row.University}</th>
    <th>{row.Country}</th>
    <th>{row.IBAN}</th>
    <th>{row.CarModel}</th>
  </tr>
)

const App = () => {
  const selectedDivRef = useRef(null);
  const [rows, setRows] = useState(5000)
  const debouncedSetRows = debounce(val => setRows(val), 200)

  const handleClick = (text) => navigator.clipboard.writeText(text);
  const handleRowsChange = (e) => debouncedSetRows(e.target.value)

  const handleMouseLeave = ({ target }) => {
      if(target.firstChild.tagName === 'DIV') {
        target.firstChild.removeEventListener('click', handleClick)
        target.firstChild.remove();
        target.removeEventListener('mouseleave', handleMouseLeave)
      }
  }

  const handleMouseOver = ({ target: actualTarget }) => {
    const target = actualTarget.tagName === 'DIV' ? actualTarget.parentNode : actualTarget;

    if(target !== selectedDivRef.current && target.tagName === 'TH') {
      const text = target.innerText;
      const div = document.createElement('div');

      div.addEventListener('click', () => handleClick(text))
      target.addEventListener('mouseleave', handleMouseLeave)
      div.innerText = 'Click to Copy';
      selectedDivRef.current = target;
      target.prepend(div)
    };
  }

  return (
    <Styles>
      <RowsSelector rows={rows} onChange={handleRowsChange}/>
      <table onMouseOver={handleMouseOver}>
        <thead>
         <Header/>
        </thead>
        <tbody>
          {data.slice(0, rows).map(row =>
            <Row key={row.ID} row={row}/>
          )}
        </tbody>
      </table>
    </Styles>
  );
}

export default App;