import { useState } from "react";
import Table from "react-bootstrap/Table";
import "./Sheet.css";
function Sheet() {
  let alphabet = [
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const [rows, setRows] = useState([]);

  const [matrix, setMatrix] = useState([]);

  const VerticalButtonClick = () => {};
  const handleButtonClick = () => {};

  // const [vertical, setVertical] = useState([]);
  // const VerticalButtonClick = () => {
  //     const newVertical = (
  //       <th style={{ width: "150px" }}>
  //         {alphabet[vertical.length]}
  //       </th>
  //     );
  //     setVertical([...vertical, newVertical]);
  //   };

  // const handleButtonClick = () => {
  //     const newRow = (
  //       <tr>
  //         <td>{rows.length + 2 }</td>
  //         <td></td>
  //         <td></td>
  //         <td></td>
  //       </tr>
  //     );
  //     setRows([...rows, newRow]);
  //   };

  return (
    <div>
      <button
        type='button'
        class='btn btn-light right-bottom-one'
        onClick={() => VerticalButtonClick()}
      >
        Добавить Вертикаль
      </button>
      <button
        type='button'
        class='btn btn-light right-bottom-two'
        onClick={() => handleButtonClick()}
      >
        Добавить Горизонталь
      </button>
      <Table striped bordered hover>
        {/* <thead>
          <tr>
            <th style={{width:"150px"}}>#</th>
            <th style={{width:"150px"}}>A</th>
            <th style={{width:"150px"}}>B</th>
            <th style={{width:"150px"}}>C</th>
            {vertical.map((vert) => vert)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          {rows.map((row) => row)}
        </tbody> */}
      </Table>
    </div>
  );
}
export default Sheet;
