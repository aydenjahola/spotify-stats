import { PuffLoader } from "react-spinners";

export default function Spinner({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <PuffLoader color="#6366F1" size={80} />
      <p className="text-indigo-600 font-semibold text-lg">{message}</p>
    </div>
  );
}
