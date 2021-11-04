import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

import { createServer } from "miragejs";

createServer({
  routes() {
    this.namespace = "api";

    this.get("transactions", () => {
      return [
        {
          id: 1,
          title: "Dinner",
          amount: 1000,
          type: "withdraw",
          category: "Food",
          createdAt: new Date(),
        },
        {
          id: 2,
          title: "Salary",
          amount: 5000,
          type: "deposit",
          category: "Salary",
          createdAt: new Date(),
        },
        {
          id: 3,
          title: "Website Development",
          amount: 12000,
          type: "deposit",
          category: "Freelancer",
          createdAt: new Date(),
        },
      ];
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
