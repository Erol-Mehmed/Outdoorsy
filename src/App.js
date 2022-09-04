import { createContext, useState } from "react";
import "./App.css";
import Home from "./components/views/Home/Home";

export const UserDataContext = createContext();

function App() {
  const [resultReference, setResultReference] = useState([]);
  const [resultEdit, setResultEdit] = useState([]);
  const [range, setRange] = useState({ min: 0, max: 0 });
  const [limit, setLimit] = useState(8);
  const [data, setData] = useState('');

  console.log(limit);


  return (
    <UserDataContext.Provider value={{
      resultReference, setResultReference,
      resultEdit, setResultEdit, range, setRange,
      limit, setLimit, data, setData
    }}>
      <Home />
    </UserDataContext.Provider>
  );
}

export default App;
