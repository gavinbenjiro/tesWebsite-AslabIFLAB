import React from "react";
import { getSubmissions } from "../api/tp";
import useFetch from "../hooks/useFetch";
import Card from "../components/Card";

export default function AssignmentsPage() {
  const { data: assignments, loading, error } = useFetch(getSubmissions);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Tugas Pendahuluan Praktikum IFLAB
      </h1>
      {loading && <Card>Loading...</Card>}
      {error && <Card>Error loading assignments</Card>}

      <div className="grid gap-4">
        {assignments?.map((a) => (
          <Card key={a.id}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">{a.title}</h2>
                <p className="text-sm mt-1">ID: {a.subtitle}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
