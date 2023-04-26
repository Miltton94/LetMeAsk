import Router from "./router/Router";
import { BrowserRouter } from "react-router-dom";

import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

