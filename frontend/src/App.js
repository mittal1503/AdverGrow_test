import "./App.css";
import { Router } from "./router.js";
import { UserProvider } from "./context/Usercontext.js";
import store from "./store.js";
import { Provider } from "react-redux";
function App() {
  return (
    <>
      <Provider store={store}>
        <UserProvider>
          <Router />
        </UserProvider>
      </Provider>
    </>
  );
}

export default App;
