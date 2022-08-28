import { createContext, useState } from "react";
import "./App.css";
import Home from "./components/views/Home/Home";

export const UserDataContext = createContext();

function App() {
  const [result, setResult] = useState();
  return (
    <UserDataContext.Provider value={{ result, setResult }}>
      <Home />
    </UserDataContext.Provider>
  );
}

export default App;
