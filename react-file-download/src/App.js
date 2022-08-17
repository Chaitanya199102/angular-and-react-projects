import logo from './logo.svg';
import './App.css';

function App() {

  const header_mapping = {
    rollNo: 'roll_no',
    name: 'name'
  };

  let objArray = [
    {
      rollNo: '001',
      name: 'chaitanya'
    }, {
      rollNo: '002',
      name: 'harshi'
    }
  ];

  const exportJsonToCSV = function() {
    var arr = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    var headers =
      `${Object.keys(arr[0])
        .map((value) => `"${header_mapping[value]}"`)
        .join(',')}` + '\r\n';
    var csvContent = arr.reduce((st, next) => {
      st +=
        `${Object.values(next)
          .map((value) => `"${value}"`)
          .join(',')}` + '\r\n';
      return st;
    }, headers);

    var element = document.createElement('a');
    element.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    element.target = '_blank';
    element.download = 'export.csv';
    element.click();
    element.remove();
 }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          style={{
            fontSize: '1.25em',
            background: 'white', 
            color: 'black',
            cursor: 'pointer'
          }}
          onClick={exportJsonToCSV}
        >{'Download'}</button>
        <br/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
