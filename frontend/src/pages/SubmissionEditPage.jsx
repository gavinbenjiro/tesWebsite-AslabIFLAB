import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSubmission, patchSubmission } from "../api/submissions";

export default function SubmissionEditPage() {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [grade, setGrade] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    getSubmission(id).then((res) => {
      setSubmission(res.data);
      setGrade(res.data.grade || "");
      setStatus(res.data.status || "");
    });
  }, [id]);

  const handlePatch = async (e) => {
    e.preventDefault();
    try {
      await patchSubmission(id, { grade, status });
      alert("Updated");
      window.location.href = "/submissions";
    } catch (e) {
      alert("Update failed");
    }
  };

  if (!submission) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Submission</h1>
      <form
        onSubmit={handlePatch}
        className="space-y-4 bg-white p-4 rounded shadow"
      >
        <div>
          <div className="text-sm">Student: {submission.student_name}</div>
          <div className="text-sm">
            Assignment ID: {submission.assignment_id}
          </div>
        </div>
        <div>
          <label className="block text-sm">Grade</label>
          <input
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm">Status</label>
          <input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
