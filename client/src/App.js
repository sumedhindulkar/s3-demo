import "./App.css";
import Upload from "./Upload";
import UploadFromBackend from "./UploadFromBackend";
import UploadFromFrontend from "./UploadFromFrontend";
function App() {
  return (
    <>
      {/* <UploadFromBackend /> */}
      <UploadFromFrontend />
      <img
        src={"http://localhost:8000/image/971b1906ed742b109ae40d74ea1bc43c"}
      />
    </>
  );
}

export default App;
