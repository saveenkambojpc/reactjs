import { BrowserRouter } from "react-router-dom";
import RoutesProvider from "./components/router/index.tsx";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "./theme/index.tsx";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>

        <Toaster />
        <RoutesProvider />
      </BrowserRouter>
    </ThemeProvider>
  )
}