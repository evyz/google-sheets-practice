import { memo, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Cell from "../cell/Cell";
import "./Sheet.css";
function Sheet({ props, backHandler }) {
  const [matrix, setMatrix] = useState([]);
  const [counts, setCounts] = useState({ x: 13, y: 4 });
  const [isLoading, setIsLoading] = useState(true);

  const handleButtonClick = (event, position) => {
    if (event === "add") {
      if (position === "x") {
        setCounts((prev) => {
          return { ...prev, x: prev[position] + 1 };
        });
      } else {
        setCounts((prev) => {
          return { ...prev, y: prev[position] + 1 };
        });
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    let arr = [];
    for (let i = 0; i < counts.x; i++) {
      let obj = [];
      for (let y = 0; y < counts.y; y++) {
        obj.push({ value: null });
      }
      arr.push(obj);
    }

    setMatrix(arr);
    setIsLoading(false);
  }, [counts]);

  return (
    <div>
      <div style={{ width: "100%", height: "10vh" }}>
        <button
          type='button'
          class='btn btn-danger'
          onClick={() => backHandler()}
        >
          Закрыть таблицу
        </button>
        <button
          type='button'
          class='btn btn-light'
          onClick={() => handleButtonClick("add", "y")}
        >
          Добавить Вертикаль
        </button>
        <button
          type='button'
          class='btn btn-light'
          onClick={() => handleButtonClick("add", "x")}
        >
          Добавить Горизонталь
        </button>
      </div>
      {!isLoading && matrix.length > 0 && (
        <div className='default-table'>
          <Table striped bordered hover>
            <thead>
              <tr>
                {matrix[0].map((item, index) => (
                  <td>{index + 1}</td>
                ))}
              </tr>
            </thead>

            <tbody>
              {matrix.map((row) => (
                <tr>
                  {row.length > 0 && row.map((cell) => <Cell props={cell} />)}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}
export default Sheet;
