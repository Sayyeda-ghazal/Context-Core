import React from "react";

export default function DashboardShell({ children }) {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {children}
    </div>
  );
}

