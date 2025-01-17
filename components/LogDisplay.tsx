"use client";

import { EspressoLog } from "../types";

const LogDisplay: React.FC<{ logs: EspressoLog[] }> = ({ logs }) => {
  const sortedLogs = logs.sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <h2 className="text-lg font-bold">Logs</h2>
      <ul className="space-y-4">
        {sortedLogs.map((log) => (
          <li key={log.id} className="border p-4 rounded-md">
            <p>{new Date(log.timestamp).toLocaleString()}</p>
            <p>
              <strong>Grind Size:</strong> {log.grindSize}
            </p>
            <p>
              <strong>Weight:</strong> {log.weight}g
            </p>
            <p>
              <strong>Brew Time:</strong> {log.brewTime}s
            </p>
            {log.temperature && (
              <p>
                <strong>Temperature:</strong> {log.temperature}°C
              </p>
            )}
            <p>
              <strong>Yield:</strong> {log.yield}g
            </p>
            {log.tastes.length > 0 && (
              <p>
                <strong>Taste:</strong>{" "}
                {log.tastes.map((taste) => ` ${taste}`).join(",")}
              </p>
            )}
            {log.notes && (
              <p>
                <strong>Notes:</strong> {log.notes}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogDisplay;
