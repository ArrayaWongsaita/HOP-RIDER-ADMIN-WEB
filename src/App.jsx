import AuthContextProvider from "./contexts/authContext";
import RiderContextProvider from "./contexts/riderContext";
import AppRouter from "./routes/AppRouter";
import { Slide, ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthContextProvider>
      <RiderContextProvider>
        <AppRouter />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          transition={Slide}
          theme="colored"
          draggable
        />
      </RiderContextProvider>
    </AuthContextProvider>
  );
}

export default App;
