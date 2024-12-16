export default function TotalListeningTime({
  data: totalListeningTime,
}: {
  data: number | null;
}) {
  return (
    <div className="p-8 bg-gradient-to-r from-green-800 to-blue-900 rounded-xl shadow-xl hover:shadow-2xl transition-all">
      <h3 className="text-xl font-semibold text-white">Total Listening Time</h3>
      <p className="text-5xl font-extrabold text-white mt-4">
        {totalListeningTime?.toFixed(2)} mins
      </p>
      <p className="text-gray-400 mt-2">Past 4 Weeks</p>
    </div>
  );
}
