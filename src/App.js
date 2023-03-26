import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "./Auth";
import Sheets from "./components/sheets/sheets";

function App() {
  return (
    <div className='App'>
      <Auth>
        <Sheets />
      </Auth>
    </div>
  );
}

export default App;
