import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { UserProvider } from "./contexts/user.context";
import { ProductsProvider } from "./contexts/products.context";
import { JobsProvider } from "./contexts/jobs.context";
import { ProposalProvider } from "./contexts/proposal.context";

import "./index.css";
import "flowbite";
import "tailwindcss/tailwind.css";

const rootElement = document.getElementById("root");

render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <JobsProvider>
            <ProposalProvider>
              <App />
            </ProposalProvider>
          </JobsProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
