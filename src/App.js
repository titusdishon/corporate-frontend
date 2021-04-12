import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { renderRoutes } from "react-router-config";
import routes from "./routes";
import "./app.css";
import {AuthProvider} from './context/auth'

const history = createBrowserHistory();

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router history={history}>{renderRoutes(routes)}</Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
