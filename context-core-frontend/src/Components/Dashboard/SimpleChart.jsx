export default function SimpleChart({ data = [], height = 220, labelEvery = 6 }) {
  const safe = Array.isArray(data) ? data : [];
  const counts = safe.map((d) => Number(d?.count ?? 0)).filter((n) => Number.isFinite(n));
  const max = Math.max(1, ...counts);
  const step = Math.max(1, Math.ceil(safe.length / labelEvery));

  return (
    <div className="w-full" style={{ height }}>
      {safe.length === 0 ? (
        <div className="h-full flex items-center justify-center text-sm text-gray-500">
          No chart data.
        </div>
      ) : (
        <div className="h-full flex flex-col">
          <div className="flex-1 flex items-end gap-1">
            {safe.map((d, idx) => {
              const value = Number(d?.count ?? 0);
              const pct = Math.max(0, Math.min(100, (value / max) * 100));
              return (
                <div key={`${d?.date ?? "d"}-${idx}`} className="flex-1 h-full flex items-end">
                  <div
                    className="w-full rounded-t bg-indigo-200 border border-indigo-200"
                    style={{ height: `${pct}%` }}
                    title={`${d?.date ?? ""}: ${value}`}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-2 flex gap-1 text-[10px] text-gray-500">
            {safe.map((d, idx) => (
              <div key={`lbl-${d?.date ?? "d"}-${idx}`} className="flex-1 text-center truncate">
                {idx % step === 0 ? String(d?.date ?? "") : ""}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
