import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Header from "./components/Header";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
