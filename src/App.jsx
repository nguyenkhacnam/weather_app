import "./App.css";
import useRouterElement from "./useRouteElements";
function App() {
  const routeElements = useRouterElement();
  return <>{routeElements}</>;
}

export default App;
