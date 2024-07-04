import AuthContextProvider from "./contexts/authContext";
import RiderContextProvider from "./contexts/riderContext";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <AuthContextProvider>
      <RiderContextProvider>
        <AppRouter />
      </RiderContextProvider>
    </AuthContextProvider>
  );
}

export default App;
