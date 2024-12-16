export default function TotalStreams({ data }: { data: number }) {
  return (
    <div className="p-8 bg-gradient-to-r from-blue-800 to-purple-900 rounded-xl shadow-xl hover:shadow-2xl transition-all">
      <h3 className="text-xl font-semibold text-white">Total Streams</h3>
      <p className="text-6xl font-extrabold text-white mt-4">
        {data.toLocaleString()}
      </p>
      <p className="text-gray-400 mt-2">Past 4 Weeks</p>
    </div>
  );
}
