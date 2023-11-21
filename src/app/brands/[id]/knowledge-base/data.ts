import React from "react";

const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "TYPE", uid: "type", sortable: true},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "CREATED AT", uid: "created_at", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Error", uid: "error"},
  {name: "Loading", uid: "loading"},
];

export {columns, statusOptions};
