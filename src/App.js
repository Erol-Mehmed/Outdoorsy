import { createContext, useState } from "react";
import "./App.css";
import Home from "./components/views/Home/Home";

export const UserDataContext = createContext();

function App() {
  const [resultReference, setResultReference] = useState();
  const [resultEdit, setResultEdit] = useState();
  const [range, setRange] = useState({min: '', max: ''});
  return (
    <UserDataContext.Provider value={{ resultReference, setResultReference, resultEdit, setResultEdit, range, setRange }}>
      <Home />
    </UserDataContext.Provider>
  );
}

export default App;
