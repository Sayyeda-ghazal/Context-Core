import React from "react";
import SimpleChart from "./SimpleChart";
import SectionCard from "./SectionCard";

export default function DashboardChart({ data = [] }) {
  return (
    <SectionCard title="Query Activity (30 Days)">
      <div className="w-full h-[300px]">
        <SimpleChart data={data} height={300} />
      </div>
    </SectionCard>
  );
}

