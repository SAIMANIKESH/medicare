import { adherenceData } from '../lib/constants';

export default function Adherence() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Medication Adherence</h2>

      <div className="bg-white shadow rounded-xl p-5 border border-gray-100">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="pb-2">Date</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {adherenceData.map(({ date, taken }, idx) => (
              <tr key={idx} className="text-gray-700">
                <td className="py-2">{date}</td>
                <td className="py-2">
                  {taken ? (
                    <span className="text-green-600 font-medium">✅ Taken</span>
                  ) : (
                    <span className="text-red-500 font-medium">❌ Missed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};