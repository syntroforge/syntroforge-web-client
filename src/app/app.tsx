import "./sanitize.css";
import type { VoidComponent } from "solid-js";
import { Route, Router, useNavigate } from "@solidjs/router";
import Layout from "./layout";

const App: VoidComponent = () => {
  return (
    <Router root={Layout}>
      <Route path="/" component={() => <div />} />
      <Route
        path="*"
        component={() => {
          const navigate = useNavigate();
          navigate("/", { replace: true });
          return undefined;
        }}
      />
    </Router>
  );
};

export default App;
