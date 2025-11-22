import React from "react";
import { getAssignments } from "../api/assignments";
import useFetch from "../hooks/useFetch";
import Card from "../components/Card";

export default function AssignmentsPage() {
  const { data: assignments, loading, error } = useFetch(getAssignments);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Assignments</h1>
      {loading && <Card>Loading...</Card>}
      {error && <Card>Error loading assignments</Card>}

      <div className="grid gap-4">
        {assignments?.map((a) => (
          <Card key={a.id}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">{a.title}</h2>
                <p className="text-sm mt-1">ID: {a.id}</p>
                <a
                  href={`http://localhost:8080/file?name=${encodeURIComponent(
                    a.pdf_path
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm underline mt-2 inline-block"
                >
                  Open PDF
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
