import React, { useState } from "react";
import { createSubmission } from "../api/tp";

export default function SubmissionCreatePage() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [date, setDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData();
    fd.append("Title", title);
    fd.append("Subtitle", subtitle);
    fd.append("Date", date);
    fd.append("Deadline", deadline);
    fd.append("Category", category);
    fd.append("Description", description);

    try {
      await createSubmission(fd);
      alert("Created");
      window.location.href = "/soaltugas";
    } catch (e) {
      console.error(e);
      alert("Create failed");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tambah Tugas Baru</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-4 rounded shadow"
      >
        <div>
          <label className="block text-sm">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm">Subtitle</label>
          <input
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm">Date</label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm">Deadline</label>
          <input
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm">Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
