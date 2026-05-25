import React from "react";

export default function DashboardHeader({ title = "Dashboard", subtitle }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">
        {title}
      </h1>
      {subtitle ? (
        <p className="text-gray-500 mt-1">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

