export default function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 flex items-center justify-between">
      
      <div>
        <p className="text-sm text-gray-500">
          {title}
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-1">
          {value}
        </h3>
      </div>

      <div className="bg-indigo-100 p-3 rounded-xl">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>

    </div>
  );
}