export default function StatCard({ title, value, icon, color = "bg-blue-100 text-blue-600" }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl font-bold">{value ?? 0}</div>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        {icon || null}
      </div>
    </div>
  );
}
