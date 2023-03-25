import { memo, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Cell from "../cell/Cell";
import "./Sheet.css";
function Sheet() {
  const [matrix, setMatrix] = useState([]);
  const [counts, setCounts] = useState({ x: 4, y: 2 });
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
      <button
        type='button'
        class='btn btn-light right-bottom-one'
        onClick={() => handleButtonClick("add", "y")}
      >
        Добавить Вертикаль
      </button>
      <button
        type='button'
        class='btn btn-light right-bottom-two'
        onClick={() => handleButtonClick("add", "x")}
      >
        Добавить Горизонталь
      </button>
      {!isLoading && matrix.length > 0 && (
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
      )}
    </div>
  );
}
export default Sheet;
