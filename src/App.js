import { createContext, useState } from "react";
import "./App.css";
import Home from "./components/views/Home/Home";

export const UserDataContext = createContext();

function App() {
  const [resultReference, setResultReference] = useState([]);
  const [resultEdit, setResultEdit] = useState([]);
  const [range, setRange] = useState({ min: 0, max: 0 });
  const [resultCount, setResultCount] = useState(0);
  const [data, setData] = useState('');

  return (
    <UserDataContext.Provider value={{
      resultReference, setResultReference,
      resultEdit, setResultEdit, range, setRange,
      resultCount, setResultCount,
      data, setData
    }}>
      <Home />
    </UserDataContext.Provider>
  );
}

export default App;
