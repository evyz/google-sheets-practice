import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "./Auth";
import Sheet from "./components/sheet/Sheet";

function App() {
  return (
    <div className='App'>
      <Auth>
        <Sheet />
      </Auth>
    </div>
  );
}

export default App;
