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
    <Cell content={row.ID}/>
    <Cell content={row.JobTitle}/>
    <Cell content={row.EmailAddress}/>
    <Cell content={row.FirstName}/>
    <Cell content={row.LastName}/>
    <Cell content={row.University}/>
    <Cell content={row.Country}/>
    <Cell content={row.IBAN}/>
    <Cell content={row.CarModel}/>
  </tr>
)

const Cell = ({ content }) =>  {
  const [isVisible, setIsVisible] = useState(false);
  const selectedDivRef = useRef(null);

  const handleClick = (e) => {
    navigator.clipboard.writeText(e.currentTarget.firstChild.textContent);
  }

  const handleMouseLeave = ({ target }) => {
      if(target.lastChild.tagName === 'DIV') {
        setIsVisible(false);
      }
  }

  const handleMouseOver = ({ currentTarget }) => {
    const targetIsCell = currentTarget.parentNode.parentNode.tagName === 'TBODY';

    if(currentTarget !== selectedDivRef.current && targetIsCell) {
        selectedDivRef.current = currentTarget;
        setIsVisible(true)
    };
  }

  return (
    <th onMouseOver={handleMouseOver}  onMouseLeave={handleMouseLeave} onClick={handleClick}>
      {content}
      {isVisible && <div>Click to Copy</div>}
    </th>
  )
}

const App = () => {
  const [rows, setRows] = useState(1000)
  const debouncedSetRows = debounce(val => setRows(val), 400)
  const handleRowsChange = (e) => debouncedSetRows(e.target.value)

  return (
    <Styles>
      <RowsSelector rows={rows} onChange={handleRowsChange}/>
      <table>
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
