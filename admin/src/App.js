import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import { useState } from "react";
function App() {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div className="App">
      <Sidebar sidebar={sidebar} />
      <Navbar sidebar={sidebar} setSidebar={setSidebar} />
    </div>
  );
}

export default App;
