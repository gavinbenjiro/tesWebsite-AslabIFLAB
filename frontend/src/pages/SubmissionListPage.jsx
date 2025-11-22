import React from "react";
import { Link } from "react-router-dom";
import { getSubmissions, deleteSubmission } from "../api/tp";
import useFetch from "../hooks/useFetch";
import Card from "../components/Card";

export default function SubmissionListPage() {
  const { data: submissions, loading, error } = useFetch(getSubmissions);

  const handleDelete = async (id) => {
    if (!confirm("Delete this submission?")) return;
    try {
      await deleteSubmission(id);
      window.location.reload();
    } catch (e) {
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tugas Pendahuluan</h1>
      {loading && <Card>Loading...</Card>}
      {error && <Card>Error loading submissions</Card>}

      <div className="space-y-3">
        {submissions?.map((s) => (
          <Card key={s.id}>
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold">
                  {s.title} — {s.subtitle}
                </div>
                <div className="text-sm">
                  Assignment ID: {s.date} • Grade: {s.deadline || "-"}
                </div>
                <p className="text-sm mt-2">{s.description}</p>
                <a
                  href={`http://localhost:8080/file?name=${encodeURIComponent(
                    s.file_path
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm underline mt-2 inline-block"
                >
                  Open Submission PDF
                </a>
              </div>
              <div className="text-right space-y-2">
                <Link
                  to={`/submissions/${s.id}/edit`}
                  className="inline-block px-3 py-1 border rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="inline-block px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
