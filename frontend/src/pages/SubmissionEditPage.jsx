import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSubmission, patchSubmission } from "../api/tp";

export default function SubmissionEditPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getSubmission(id).then((res) => {
      setTitle(res.data.title);
      setSubtitle(res.data.subtitle);
      setDeadline(res.data.deadline);
      setCategory(res.data.category);
      setDescription(res.data.description);
    });
  }, [id]);

  const handlePatch = async (e) => {
    e.preventDefault();
    try {
      await patchSubmission(id, {
        title,
        subtitle,
        deadline,
        category,
        description,
      });
      alert("Updated");
      window.location.href = "/soaltugas";
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
