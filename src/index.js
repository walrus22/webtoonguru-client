import React from "react";
// import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {createRoot} from 'react-dom/client';
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

