import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import DashboardShell from "../../Components/Dashboard/DashboardShell";
import DashboardHeader from "../../Components/Dashboard/DashboardHeader";
import DashboardStats from "../../Components/Dashboard/DashboardStats";
import DashboardChart from "../../Components/Dashboard/DashboardChart";
import RecentDocuments from "../../Components/Dashboard/RecentDocuments";

export default function Dashboard() {
  const navigate = useNavigate();
  const auth = useAuth();

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
        if (err?.response?.status === 401) {
          await auth.logout();
          navigate("/login", { replace: true });
        }

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

  return (
    <DashboardShell>
      <DashboardHeader
        title="Dashboard"
        subtitle={`Welcome back${auth.user?.fullname ? `, ${auth.user.fullname}` : ""} 👋`}
      />
      <DashboardStats stats={stats} />
      <DashboardChart data={chartData} />
      <RecentDocuments documents={recentDocuments} />
    </DashboardShell>
  );
}
