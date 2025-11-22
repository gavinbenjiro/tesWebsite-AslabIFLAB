import React, { useState } from "react";
import { createSubmission } from "../api/submissions";

export default function SubmissionCreatePage() {
  const [assignmentId, setAssignmentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) {
      alert("Please attach a PDF");
      return;
    }
    const fd = new FormData();
    fd.append("assignment_id", assignmentId);
    fd.append("student_name", studentName);
    fd.append("description", description);
    fd.append("file", file);

    try {
      await createSubmission(fd);
      alert("Created");
      window.location.href = "/submissions";
    } catch (e) {
      console.error(e);
      alert("Create failed");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">New Submission</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-4 rounded shadow"
      >
        <div>
          <label className="block text-sm">Assignment ID</label>
          <input
            value={assignmentId}
            onChange={(e) => setAssignmentId(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm">Student Name</label>
          <input
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm">PDF File</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
