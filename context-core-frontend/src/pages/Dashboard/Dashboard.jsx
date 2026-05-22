import { useState, useEffect } from "react";
import API from "../../api/axios";
import StatCard from "./StatCard";
import SimpleChart from "../../Components/Dashboard/SimpleChart";

function IconFileText(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M16 13H8" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M16 17H8" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M10 9H8" />
    </svg>
  );
}

function IconActivity(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M22 12h-4l-3 9L9 3 6 12H2" />
    </svg>
  );
}

function IconKey(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 2l-2 2m-7.2 7.2a4 4 0 1 1-5.6-5.6 4 4 0 0 1 5.6 5.6z" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 9l6 6-3 3-2-2-2 2-2-2 3-3" />
    </svg>
  );
}

function IconZap(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9z" />
    </svg>
  );
}

export default function Dashboard() {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const res = await API.get("/dashboard/home");

        console.log("Dashboard Data:", res.data);

        setData(res.data);

      } catch (err) {

        console.error("Dashboard Error:", err);

      } finally {

        setLoading(false);

      }
    };

    fetchDashboard();

  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="p-6 text-lg font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  // Error State
  if (!data) {
    return (
      <div className="p-6 text-red-500">
        Failed to load dashboard data.
      </div>
    );
  }

  const stats = data.stats || {};
  const chartData = data.chart || [];
  const recentDocuments = data.recent_documents || [];
  console.log(chartData);

  return (

    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome back 👋
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
            title="Total Documents"
            value={stats.total_documents || 0}
            icon={IconFileText}
            />

        <StatCard
            title="Monthly Queries"
            value={stats.monthly_queries || 0}
            icon={IconActivity}
            />

        <StatCard
            title="API Keys"
            value={stats.active_api_keys || 0}
            icon={IconKey}
            />

        <StatCard
            title="Tokens Used"
            value={stats.tokens_used || 0}
            icon={IconZap}
            />

      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow">

        <h2 className="text-xl font-semibold mb-4">
            Query Activity (30 Days)
        </h2>

        <div className="w-full h-[300px]">
            <SimpleChart data={chartData} height={300} />

        </div>

        </div>

      {/* Recent Documents */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          Recent Documents
        </h2>

        {
          recentDocuments.length === 0 ? (

            <p className="text-gray-500">
              No recent documents found.
            </p>

          ) : (

            <div className="space-y-3">

              {
                recentDocuments.map((doc) => (

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

                ))
              }

            </div>

          )
        }

      </div>

    </div>
  );
}
