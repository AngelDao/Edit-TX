import Home from "./containers/Home";
import React, { useState } from "react";

function App() {
  const conState = useState(false);

  return <Home conState={conState} />;
}

export default App;
