import AuthContextProvider from "./contexts/authContext";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  );
}

export default App;
