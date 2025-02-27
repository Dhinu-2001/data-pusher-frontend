import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { persistor } from "./redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import UserRoutes from "./routes/UserRoutes";


function App() {

  return (
    <>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/*" element={<UserRoutes/>}/>
          </Routes>
        </Router>
        <Toaster
          position="top-right"
          expand={true}
          closeButton
          richColors
          duration={5000}
        />
      </PersistGate>
    </>
  )
}

export default App
