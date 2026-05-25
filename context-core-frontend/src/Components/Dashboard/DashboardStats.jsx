import React from "react";
import StatCard from "./StatCard";
import { IconActivity, IconFileText, IconKey, IconZap } from "./icons";

export default function DashboardStats({ stats = {} }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Documents"
        value={stats.total_documents || 0}
        icon={<IconFileText className="h-5 w-5" />}
      />

      <StatCard
        title="Monthly Queries"
        value={stats.monthly_queries || 0}
        icon={<IconActivity className="h-5 w-5" />}
      />

      <StatCard
        title="API Keys"
        value={stats.active_api_keys || 0}
        icon={<IconKey className="h-5 w-5" />}
      />

      <StatCard
        title="Tokens Used"
        value={stats.tokens_used || 0}
        icon={<IconZap className="h-5 w-5" />}
      />
    </div>
  );
}

