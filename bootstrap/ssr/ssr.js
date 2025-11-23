import React$1 from "react";
import { Link, Head, createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
function Pagination({ links }) {
  return /* @__PURE__ */ React$1.createElement("nav", { className: "text-center mt-4" }, links.map((link) => /* @__PURE__ */ React$1.createElement(
    Link,
    {
      preserveScroll: true,
      href: link.url || "",
      key: link.label,
      className: "inline-block py-2 px-3 mx-1 rounded-lg text-gray-500 text-xs " + (link.active ? "bg-gray-950 text-white " : " ") + (!link.url ? "!text-gray-500 cursor-not-allowed " : "hover:bg-gray-950 hover:text-white"),
      dangerouslySetInnerHTML: { __html: link.label }
    }
  )));
}
const Status = {
  STOPPED: 1,
  DEPLOYING: 2,
  RUNNING: 3,
  FAILED: 4
};
const getStatusLabel = (status) => {
  switch (status) {
    case Status.STOPPED:
      return "stopped";
    case Status.DEPLOYING:
      return "deploying";
    case Status.RUNNING:
      return "running";
    case Status.FAILED:
      return "failed";
    default:
      return "unknown";
  }
};
const getStatusStyles = (label) => {
  const styles = {
    stopped: "bg-gray-100 text-gray-800 border-gray-200",
    deploying: "bg-blue-100 text-blue-800 border-blue-200 animate-pulse",
    running: "bg-green-100 text-green-800 border-green-200",
    failed: "bg-red-100 text-red-800 border-red-200",
    unknown: "bg-gray-100 text-gray-500 border-gray-200"
  };
  return styles[label] || styles.unknown;
};
function StatusBadge({ status }) {
  const statusLabel = getStatusLabel(status);
  const activeClass = getStatusStyles(statusLabel);
  return /* @__PURE__ */ React$1.createElement("span", { className: `px-2.5 py-0.5 rounded-full text-xs font-medium border ${activeClass} capitalize` }, statusLabel);
}
function Index({ wordpressSites }) {
  return /* @__PURE__ */ React$1.createElement("div", { className: "p-6 bg-gray-100 min-h-screen" }, /* @__PURE__ */ React$1.createElement(Head, { title: "Wordpress Sites" }), /* @__PURE__ */ React$1.createElement("div", { className: "max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6" }, /* @__PURE__ */ React$1.createElement("div", { className: "flex justify-between items-center mb-4" }, /* @__PURE__ */ React$1.createElement("h2", { className: "text-2xl font-bold mb-6 text-red-600" }, "Wordpress Site List"), /* @__PURE__ */ React$1.createElement(Link, { href: "/wordpress-sites/create", className: "bg-violet-500 text-white px-4 py-2 rounded-md" }, "New Wordpress Site")), /* @__PURE__ */ React$1.createElement("table", { className: "w-full text-left border-collapse" }, /* @__PURE__ */ React$1.createElement("thead", null, /* @__PURE__ */ React$1.createElement("tr", null, /* @__PURE__ */ React$1.createElement("th", { className: "p-3 border-b" }, "Name"), /* @__PURE__ */ React$1.createElement("th", { className: "p-3 border-b" }, "Domain"), /* @__PURE__ */ React$1.createElement("th", { className: "p-3 border-b" }, "Status"), /* @__PURE__ */ React$1.createElement("th", { className: "p-3 border-b" }, "Actions"))), /* @__PURE__ */ React$1.createElement("tbody", null, wordpressSites.data.map((wordpressSite) => /* @__PURE__ */ React$1.createElement("tr", { key: wordpressSite.id, className: "hover:bg-gray-50" }, /* @__PURE__ */ React$1.createElement("td", { className: "p-3 border-b" }, wordpressSite.name), /* @__PURE__ */ React$1.createElement("td", { className: "p-3 border-b" }, wordpressSite.domain), /* @__PURE__ */ React$1.createElement("td", { className: "p-3 border-b" }, /* @__PURE__ */ React$1.createElement(
    StatusBadge,
    {
      status: wordpressSite.status
    }
  )), /* @__PURE__ */ React$1.createElement("div", { className: "mt-2 border-b" }, /* @__PURE__ */ React$1.createElement(Link, { href: `/wordpress-sites/${wordpressSite.id}/edit`, className: "mr-2" }, "Edit"), /* @__PURE__ */ React$1.createElement("form", { method: "POST", action: `/wordpress-sites/${wordpressSite.id}`, onSubmit: (e) => {
    if (!confirm("Delete?")) e.preventDefault();
  } }, /* @__PURE__ */ React$1.createElement("input", { type: "hidden", name: "_method", value: "DELETE" }), /* @__PURE__ */ React$1.createElement("button", { type: "submit", className: "text-red-600" }, "Delete"))))))), /* @__PURE__ */ React$1.createElement("div", { className: "mt-6" }, /* @__PURE__ */ React$1.createElement(Pagination, { links: wordpressSites.links }))));
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/WordpressSites/Index.jsx": __vite_glob_0_0 });
      return pages[`./Pages/${name}.jsx`];
    },
    setup: ({ App, props }) => {
      return /* @__PURE__ */ React.createElement(App, { ...props });
    }
  })
);
