//6
import React, { useEffect, useState } from "react";
import { getRecommendations, Recommendation } from "@/lib/recommendationEngine";

export default function Recommendations() {
  const [data, setData] = useState<Recommendation[]>([]);

  useEffect(() => {
    setData(getRecommendations());
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Recommended for you</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.id} className="border rounded-lg p-4">
            <div className="flex justify-between">
              <h3 className="font-medium">{item.title}</h3>
              <span title={item.reason} className="cursor-pointer text-blue-500">
                ?
              </span>
            </div>

            <p className="text-sm text-gray-500 mt-2">{item.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
