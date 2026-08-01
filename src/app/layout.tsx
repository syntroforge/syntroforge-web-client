import type { ParentComponent } from "solid-js";

const Layout: ParentComponent = (props) => {
  // oxlint-disable-next-line solid/reactivity
  return props.children;
};

export default Layout;
