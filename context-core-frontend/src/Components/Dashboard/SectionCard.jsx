import React from "react";

export default function SectionCard({ title, children, className = "" }) {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow ${className}`.trim()}>
      {title ? (
        <h2 className="text-xl font-semibold mb-4">
          {title}
        </h2>
      ) : null}
      {children}
    </div>
  );
}

