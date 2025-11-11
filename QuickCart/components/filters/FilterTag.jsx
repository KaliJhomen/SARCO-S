export default function FilterTag({ label, onClear }) {
  if (!label) return null;
  return (
    <button
      type="button"
      className="px-3 py-1 text-sm rounded-full border border-gray-300 bg-white hover:bg-gray-50 flex items-center gap-2"
      onClick={onClear}
      aria-label={`Quitar filtro ${label}`}
    >
      <span>{label}</span>
      <span className="text-gray-500">✕</span>
    </button>
  );
}