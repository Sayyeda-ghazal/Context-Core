import React from "react";
import SectionCard from "./SectionCard";

export default function RecentDocuments({ documents = [] }) {
  const safeDocs = Array.isArray(documents) ? documents : [];

  return (
    <SectionCard title="Recent Documents">
      {safeDocs.length === 0 ? (
        <p className="text-gray-500">
          No recent documents found.
        </p>
      ) : (
        <div className="space-y-3">
          {safeDocs.map((doc) => (
            <div
              key={doc.id}
              className="border rounded-xl p-4 hover:bg-gray-50 transition"
            >
              <h3 className="font-semibold text-gray-800">
                {doc.filename || doc.title || "Untitled"}
              </h3>

              <p className="text-sm text-gray-500">
                {doc.created_at ? String(doc.created_at) : ""}
              </p>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}

