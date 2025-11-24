import React$1 from "react";
import { useForm } from "react-hook-form";
import { usePage, Head, Link, router, createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
const Status = {
  STOPPED: 1,
  DEPLOYING: 2,
  RUNNING: 3,
  FAILED: 4,
  STOPPING: 5
};
function Create() {
  const { errors } = usePage().props;
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
    setError,
    clearErrors
  } = useForm({
    defaultValues: {
      name: "",
      domain: "",
      server_ip: "",
      ssh_port: 22,
      ssh_user: "",
      ssh_password: "",
      ssh_password_confirmation: "",
      status: Status.STOPPED
    }
  });
  const onSubmit = (data) => {
    clearErrors();
    router.post("/wordpress-sites", data, {
      onError: (errors2) => {
        Object.keys(errors2).forEach((key) => {
          setError(key, { message: errors2[key] });
        });
      }
    });
  };
  return /* @__PURE__ */ React$1.createElement("div", { className: "p-6 bg-gray-100 min-h-screen" }, /* @__PURE__ */ React$1.createElement(Head, { title: "Create Wordpress Site" }), /* @__PURE__ */ React$1.createElement("div", { className: "max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6" }, /* @__PURE__ */ React$1.createElement("div", { className: "flex justify-between items-center mb-6" }, /* @__PURE__ */ React$1.createElement("h1", { className: "text-2xl font-bold text-gray-800" }, "Create New Wordpress Site"), /* @__PURE__ */ React$1.createElement(
    Link,
    {
      href: "/wordpress-sites",
      className: "bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-200"
    },
    "Back to List"
  )), /* @__PURE__ */ React$1.createElement("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6" }, /* @__PURE__ */ React$1.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ React$1.createElement("div", null, /* @__PURE__ */ React$1.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1" }, "Site Name ", /* @__PURE__ */ React$1.createElement("span", { className: "text-sm text-red-500" }, "*")), /* @__PURE__ */ React$1.createElement(
    "input",
    {
      type: "text",
      ...register("name", {
        required: "Site name is required",
        minLength: {
          value: 2,
          message: "Site name must be at least 2 characters"
        },
        maxLength: {
          value: 255,
          message: "Site name must be at most 255 characters"
        }
      }),
      className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.name ? "border-red-500" : "border-gray-300"}`,
      placeholder: "Enter site name"
    }
  ), formErrors.name && /* @__PURE__ */ React$1.createElement("p", { className: "mt-1 text-sm text-red-600" }, formErrors.name.message)), /* @__PURE__ */ React$1.createElement("div", null, /* @__PURE__ */ React$1.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1" }, "Domain ", /* @__PURE__ */ React$1.createElement("span", { className: "text-sm text-red-500" }, "*")), /* @__PURE__ */ React$1.createElement(
    "input",
    {
      type: "text",
      ...register("domain", {
        required: "Domain is required",
        pattern: {
          value: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/,
          message: "Please enter a valid domain"
        }
      }),
      className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.domain ? "border-red-500" : "border-gray-300"}`,
      placeholder: "https://example.com"
    }
  ), formErrors.domain && /* @__PURE__ */ React$1.createElement("p", { className: "mt-1 text-sm text-red-600" }, formErrors.domain.message)), /* @__PURE__ */ React$1.createElement("div", null, /* @__PURE__ */ React$1.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1" }, "Server IP ", /* @__PURE__ */ React$1.createElement("span", { className: "text-sm text-red-500" }, "*")), /* @__PURE__ */ React$1.createElement(
    "input",
    {
      type: "text",
      ...register("server_ip", {
        required: "Server IP is required",
        pattern: {
          value: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
          message: "Please enter a valid IP address"
        }
      }),
      className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.server_ip ? "border-red-500" : "border-gray-300"}`,
      placeholder: "192.168.1.100"
    }
  ), formErrors.server_ip && /* @__PURE__ */ React$1.createElement("p", { className: "mt-1 text-sm text-red-600" }, formErrors.server_ip.message)), /* @__PURE__ */ React$1.createElement("div", null, /* @__PURE__ */ React$1.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1" }, "SSH Port"), /* @__PURE__ */ React$1.createElement(
    "input",
    {
      type: "number",
      ...register("ssh_port", {
        required: "SSH port is required",
        min: { value: 1, message: "SSH port must be greater than 0" },
        max: { value: 65535, message: "SSH port must be less than 65536" }
      }),
      className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.ssh_port ? "border-red-500" : "border-gray-300"}`,
      placeholder: "22"
    }
  ), formErrors.ssh_port && /* @__PURE__ */ React$1.createElement("p", { className: "mt-1 text-sm text-red-600" }, formErrors.ssh_port.message)), /* @__PURE__ */ React$1.createElement("div", null, /* @__PURE__ */ React$1.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1" }, "SSH User"), /* @__PURE__ */ React$1.createElement(
    "input",
    {
      type: "text",
      ...register("ssh_user", {
        required: "SSH user is required",
        maxLength: {
          value: 255,
          message: "SSH user must be at most 255 characters"
        }
      }),
      className: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
      placeholder: "ubuntu"
    }
  ), formErrors.ssh_user && /* @__PURE__ */ React$1.createElement("p", { className: "mt-1 text-sm text-red-600" }, formErrors.ssh_user.message)), /* @__PURE__ */ React$1.createElement("div", null, /* @__PURE__ */ React$1.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1" }, "SSH Password"), /* @__PURE__ */ React$1.createElement(
    "input",
    {
      type: "password",
      ...register("ssh_password", {
        required: "SSH password is required"
      }),
      className: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
      placeholder: "SSH password"
    }
  ), formErrors.ssh_password && /* @__PURE__ */ React$1.createElement("p", { className: "mt-1 text-sm text-red-600" }, formErrors.ssh_password.message)), /* @__PURE__ */ React$1.createElement("div", null, /* @__PURE__ */ React$1.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1" }, "Confirm SSH Password"), /* @__PURE__ */ React$1.createElement(
    "input",
    {
      type: "password",
      ...register("ssh_password_confirmation", {
        required: "SSH password confirmation is required"
      }),
      className: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
      placeholder: "Confirm SSH password"
    }
  ), formErrors.ssh_password_confirmation && /* @__PURE__ */ React$1.createElement("p", { className: "mt-1 text-sm text-red-600" }, formErrors.ssh_password_confirmation.message))), /* @__PURE__ */ React$1.createElement("div", { className: "flex justify-end space-x-3 pt-4" }, /* @__PURE__ */ React$1.createElement(
    Link,
    {
      href: "/wordpress-sites",
      className: "bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition duration-200"
    },
    "Cancel"
  ), /* @__PURE__ */ React$1.createElement(
    "button",
    {
      type: "submit",
      disabled: isSubmitting,
      className: "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-md transition duration-200 flex items-center cursor-pointer"
    },
    isSubmitting ? /* @__PURE__ */ React$1.createElement(React$1.Fragment, null, /* @__PURE__ */ React$1.createElement("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" }, /* @__PURE__ */ React$1.createElement("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), /* @__PURE__ */ React$1.createElement("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })), "Creating...") : "Create Site"
  )), errors && Object.keys(errors).length > 0 && /* @__PURE__ */ React$1.createElement("div", { className: "bg-red-50 border border-red-200 rounded-md p-4" }, /* @__PURE__ */ React$1.createElement("h3", { className: "text-red-800 font-medium mb-2" }, "Please fix the following errors:"), /* @__PURE__ */ React$1.createElement("ul", { className: "list-disc list-inside text-red-700 text-sm" }, Object.entries(errors).map(([key, error]) => /* @__PURE__ */ React$1.createElement("li", { key }, error)))))));
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create
}, Symbol.toStringTag, { value: "Module" }));
function Edit() {
  const { wordpressSite, errors } = usePage().props;
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting, isDirty },
    setError,
    clearErrors
  } = useForm({
    defaultValues: {
      name: wordpressSite.name || "",
      domain: wordpressSite.domain || "",
      server_ip: wordpressSite.server_ip || "",
      ssh_port: wordpressSite.ssh_port || 22,
      ssh_user: wordpressSite.ssh_user || "",
      ssh_password: "",
      // Empty for security
      ssh_password_confirmation: "",
      status: wordpressSite.status || Status.STOPPED
    }
  });
  const onSubmit = (data) => {
    clearErrors();
    const submitData = { ...data };
    if (!submitData.ssh_password) {
      delete submitData.ssh_password;
      delete submitData.ssh_password_confirmation;
    }
    router.put(`/wordpress-sites/${wordpressSite.id}`, submitData, {
      onError: (errors2) => {
        Object.keys(errors2).forEach((key) => {
          setError(key, { message: errors2[key] });
        });
      }
    });
  };
  return /* @__PURE__ */ React$1.createElement("div", { className: "p-6 bg-gray-100 min-h-screen" }, /* @__PURE__ */ React$1.createElement(Head, { title: `Edit ${wordpressSite.name}` }), /* @__PURE__ */ React$1.createElement("div", { className: "max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6" }, /* @__PURE__ */ React$1.createElement("div", { className: "flex justify-between items-center mb-6" }, /* @__PURE__ */ React$1.createElement("h1", { className: "text-2xl font-bold text-gray-800" }, "Edit Wordpress Site: ", wordpressSite.name), /* @__PURE__ */ React$1.createElement(
    Link,
    {
      href: "/wordpress-sites",
      className: "bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-200"
    },
    "Back to List"
  )), /* @__PURE__ */ React$1.createElement("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6" }, /* @__PURE__ */ React$1.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ React$1.createElement("div", null, /* @__PURE__ */ React$1.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1" }, "Site Name ", /* @__PURE__ */ React$1.createElement("span", { className: "text-sm text-red-500" }, "*")), /* @__PURE__ */ React$1.createElement(
    "input",
    {
      type: "text",
      ...register("name", {
        required: "Site name is required",
        minLength: {
          value: 2,
          message: "Site name must be at least 2 characters"
        },
        maxLength: {
          value: 255,
          message: "Site name must be at most 255 characters"
        }
      }),
      className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.name ? "border-red-500" : "border-gray-300"}`,
      placeholder: "Enter site name"
    }
  ), formErrors.name && /* @__PURE__ */ React$1.createElement("p", { className: "mt-1 text-sm text-red-600" }, formErrors.name.message)), /* @__PURE__ */ React$1.createElement("div", null, /* @__PURE__ */ React$1.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1" }, "Domain ", /* @__PURE__ */ React$1.createElement("span", { className: "text-sm text-red-500" }, "*")), /* @__PURE__ */ React$1.createElement(
    "input",
    {
      type: "text",
      ...register("domain", {
        required: "Domain is required",
        pattern: {
          value: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/,
          message: "Please enter a valid domain"
        }
      }),
      className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.domain ? "border-red-500" : "border-gray-300"}`,
      placeholder: "https://example.com"
    }
  ), formErrors.domain && /* @__PURE__ */ React$1.createElement("p", { className: "mt-1 text-sm text-red-600" }, formErrors.domain.message)), /* @__PURE__ */ React$1.createElement("div", null, /* @__PURE__ */ React$1.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1" }, "Server IP ", /* @__PURE__ */ React$1.createElement("span", { className: "text-sm text-red-500" }, "*")), /* @__PURE__ */ React$1.createElement(
    "input",
    {
      type: "text",
      ...register("server_ip", {
        required: "Server IP is required",
        pattern: {
          value: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
          message: "Please enter a valid IP address"
        }
      }),
      className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.server_ip ? "border-red-500" : "border-gray-300"}`,
      placeholder: "192.168.1.100"
    }
  ), formErrors.server_ip && /* @__PURE__ */ React$1.createElement("p", { className: "mt-1 text-sm text-red-600" }, formErrors.server_ip.message)), /* @__PURE__ */ React$1.createElement("div", null, /* @__PURE__ */ React$1.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1" }, "SSH Port"), /* @__PURE__ */ React$1.createElement(
    "input",
    {
      type: "number",
      ...register("ssh_port", {
        required: "SSH port is required",
        min: { value: 1, message: "SSH port must be greater than 0" },
        max: { value: 65535, message: "SSH port must be less than 65536" }
      }),
      className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.ssh_port ? "border-red-500" : "border-gray-300"}`,
      placeholder: "22"
    }
  ), formErrors.ssh_port && /* @__PURE__ */ React$1.createElement("p", { className: "mt-1 text-sm text-red-600" }, formErrors.ssh_port.message)), /* @__PURE__ */ React$1.createElement("div", null, /* @__PURE__ */ React$1.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1" }, "SSH User"), /* @__PURE__ */ React$1.createElement(
    "input",
    {
      type: "text",
      ...register("ssh_user", {
        required: "SSH user is required",
        maxLength: {
          value: 255,
          message: "SSH user must be at most 255 characters"
        }
      }),
      className: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
      placeholder: "ubuntu"
    }
  ), formErrors.ssh_user && /* @__PURE__ */ React$1.createElement("p", { className: "mt-1 text-sm text-red-600" }, formErrors.ssh_user.message)), /* @__PURE__ */ React$1.createElement("div", null, /* @__PURE__ */ React$1.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1" }, "SSH Password"), /* @__PURE__ */ React$1.createElement(
    "input",
    {
      type: "password",
      ...register("ssh_password"),
      className: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
      placeholder: "Leave blank to keep current password"
    }
  ), formErrors.ssh_password && /* @__PURE__ */ React$1.createElement("p", { className: "mt-1 text-sm text-red-600" }, formErrors.ssh_password.message)), /* @__PURE__ */ React$1.createElement("div", null, /* @__PURE__ */ React$1.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1" }, "Confirm SSH Password"), /* @__PURE__ */ React$1.createElement(
    "input",
    {
      type: "password",
      ...register("ssh_password_confirmation"),
      className: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
      placeholder: "Confirm new password"
    }
  ), formErrors.ssh_password_confirmation && /* @__PURE__ */ React$1.createElement("p", { className: "mt-1 text-sm text-red-600" }, formErrors.ssh_password_confirmation.message))), /* @__PURE__ */ React$1.createElement("div", { className: "flex justify-end space-x-3 pt-4" }, /* @__PURE__ */ React$1.createElement(
    Link,
    {
      href: "/wordpress-sites",
      className: "bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition duration-200"
    },
    "Cancel"
  ), /* @__PURE__ */ React$1.createElement(
    "button",
    {
      type: "submit",
      disabled: isSubmitting || !isDirty,
      className: "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-md transition duration-200 flex items-center cursor-pointer"
    },
    isSubmitting ? /* @__PURE__ */ React$1.createElement(React$1.Fragment, null, /* @__PURE__ */ React$1.createElement("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" }, /* @__PURE__ */ React$1.createElement("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), /* @__PURE__ */ React$1.createElement("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })), "Updating...") : "Update Site"
  )), errors && Object.keys(errors).length > 0 && /* @__PURE__ */ React$1.createElement("div", { className: "bg-red-50 border border-red-200 rounded-md p-4" }, /* @__PURE__ */ React$1.createElement("h3", { className: "text-red-800 font-medium mb-2" }, "Please fix the following errors:"), /* @__PURE__ */ React$1.createElement("ul", { className: "list-disc list-inside text-red-700 text-sm" }, Object.entries(errors).map(([key, error]) => /* @__PURE__ */ React$1.createElement("li", { key }, error)))))));
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit
}, Symbol.toStringTag, { value: "Module" }));
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
    case Status.STOPPING:
      return "stopping";
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
    stopping: "bg-yellow-100 text-yellow-800 border-yellow-200",
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
  const deleteWordPressSite = (wordpressSiteId) => {
    if (confirm("Are you sure you want to delete this Wordpress site?")) {
      router.delete(`/wordpress-sites/${wordpressSiteId}`);
    }
  };
  const stopWordPressSite = (wordpressSiteId) => {
    if (confirm("Are you sure you want to stop this Wordpress site container?")) {
      router.post(`/wordpress-sites/${wordpressSiteId}/stop`);
    }
  };
  return /* @__PURE__ */ React$1.createElement("div", { className: "p-6 bg-gray-100 min-h-screen" }, /* @__PURE__ */ React$1.createElement(Head, { title: "Wordpress Sites" }), /* @__PURE__ */ React$1.createElement("div", { className: "max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6" }, /* @__PURE__ */ React$1.createElement("div", { className: "flex justify-between items-center mb-4" }, /* @__PURE__ */ React$1.createElement("h2", { className: "text-2xl font-bold mb-6 text-red-600" }, "Wordpress Site List"), /* @__PURE__ */ React$1.createElement(Link, { href: "/wordpress-sites/create", className: "bg-violet-500 text-white px-4 py-2 rounded-md" }, "New Wordpress Site")), /* @__PURE__ */ React$1.createElement("table", { className: "w-full text-left border-collapse" }, /* @__PURE__ */ React$1.createElement("thead", null, /* @__PURE__ */ React$1.createElement("tr", null, /* @__PURE__ */ React$1.createElement("th", { className: "p-3 border-b" }, "Name"), /* @__PURE__ */ React$1.createElement("th", { className: "p-3 border-b" }, "Domain"), /* @__PURE__ */ React$1.createElement("th", { className: "p-3 border-b" }, "Status"), /* @__PURE__ */ React$1.createElement("th", { className: "p-3 border-b" }, "Actions"))), /* @__PURE__ */ React$1.createElement("tbody", null, wordpressSites.data.map((wordpressSite) => /* @__PURE__ */ React$1.createElement("tr", { key: wordpressSite.id, className: "hover:bg-gray-50" }, /* @__PURE__ */ React$1.createElement("td", { className: "p-3 border-b" }, wordpressSite.name), /* @__PURE__ */ React$1.createElement("td", { className: "p-3 border-b" }, wordpressSite.domain), /* @__PURE__ */ React$1.createElement("td", { className: "p-3 border-b" }, /* @__PURE__ */ React$1.createElement(
    StatusBadge,
    {
      status: wordpressSite.status
    }
  )), /* @__PURE__ */ React$1.createElement("div", { className: "p-3 border-b flex space-x-4" }, wordpressSite.status === Status.RUNNING && /* @__PURE__ */ React$1.createElement("button", { type: "submit", className: "text-red-600 bg-red-100 px-2 py-1 rounded cursor-pointer", onClick: () => stopWordPressSite(wordpressSite.id) }, "Stop Container"), /* @__PURE__ */ React$1.createElement(Link, { href: `/wordpress-sites/${wordpressSite.id}/edit`, className: "mr-2 bg-blue-100 px-2 py-1 rounded" }, "Edit"), /* @__PURE__ */ React$1.createElement("button", { type: "submit", className: "text-red-600 bg-red-100 px-2 py-1 rounded cursor-pointer", onClick: () => deleteWordPressSite(wordpressSite.id) }, "Delete")))))), /* @__PURE__ */ React$1.createElement("div", { className: "mt-6" }, /* @__PURE__ */ React$1.createElement(Pagination, { links: wordpressSites.links }))));
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/WordpressSites/Create.jsx": __vite_glob_0_0, "./Pages/WordpressSites/Edit.jsx": __vite_glob_0_1, "./Pages/WordpressSites/Index.jsx": __vite_glob_0_2 });
      return pages[`./Pages/${name}.jsx`];
    },
    setup: ({ App, props }) => {
      return /* @__PURE__ */ React.createElement(App, { ...props });
    }
  })
);
