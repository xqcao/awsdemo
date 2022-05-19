import React from "react";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import Content from "./components/Content";
import About from "./components/About";
import Welcome from "./components/Welcome";
import PyLambda from "./components/PyLambda";
import DockerDemo from "./components/DockerDemo";
import UbuntuPy from "./components/UbuntuPy";
import TerraformDemo from "./components/TerraformDemo";
import CrioDemo from "./components/CrioDemo";
import K8sInstallDemo from "./components/K8sInstallDemo";
import InitK8sClusterDemo from "./components/InitK8sClusterDemo";

const routes: any[] = [
  { name: "WelcomePage", url: "/", component: Welcome },
  { name: "Ubuntu install Py", url: "/ubuntu", component: UbuntuPy },
  {
    name: "Docker build layer package",
    url: "/docker",
    component: DockerDemo,
  },
  { name: "Py Lambda Page", url: "/pylambda", component: PyLambda },
  {
    name: "Terraform create VPC... Page",
    url: "/awsterraform",
    component: TerraformDemo,
  },
  { name: "Install Cri-o in Ubuntu", url: "/criodemo", component: CrioDemo },
  {
    name: "Install kubernetes in Ubuntu",
    url: "/k8sdemo",
    component: K8sInstallDemo,
  },
  {
    name: "Init kubeadm Cluster Demo",
    url: "/initk8s",
    component: InitK8sClusterDemo,
  },
  { name: "AboutPage", url: "/about", component: About },
  { name: "ContentPage", url: "/content", component: Content },
];
function App() {
  return (
    <div className="App">
      <h2>python script running on aws lambda</h2>
      <ol>
        {routes.map((el, idx) => (
          <li key={el.name + "-" + idx}>
            <Link to={el.url}>{el.name}</Link>
          </li>
        ))}
      </ol>
      <hr />
      <Routes>
        {routes.map((el, idx) => (
          <Route
            key={el.name + "_" + idx}
            path={el.url}
            element={<el.component />}
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
