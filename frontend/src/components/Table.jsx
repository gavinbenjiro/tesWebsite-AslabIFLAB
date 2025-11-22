import React from "react";
export default function Table({ columns, data, actions }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c} className="text-left px-4 py-2 border-b">
                {c}
              </th>
            ))}
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col} className="px-4 py-2 border-b">
                  {row[col.toLowerCase().replace(/ /g, "_")] || ""}
                </td>
              ))}
              <td className="px-4 py-2 border-b">{actions(row)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
