import styled from '@emotion/styled'

const Styles = styled.div`
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

  & span {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & div {
    font-size: 10px;
  }

  & label {
    font-size: 20px;
  }

  & input {
    margin: 0 auto;
    padding: 10px;
    margin: 50px;
  }

  & input::-webkit-inner-spin-button {
    height: 40px;
  }


  & table {
    table-layout:fixed;
    margin: 0 auto;
  }

  & thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
  }

  & th {
    display: inline-block;
    padding: 12px 15px;
    width: 100px;
    height: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display:inline-block;
  }

  & tbody tr {
    border-bottom: thin solid #dddddd;
  }

  & tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  & tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }
`

export default Styles;
