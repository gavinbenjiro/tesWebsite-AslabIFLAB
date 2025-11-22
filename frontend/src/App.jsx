import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AssignmentsPage from "./pages/AssignmentsPage";
import SubmissionListPage from "./pages/SubmissionListPage";
import SubmissionCreatePage from "./pages/SubmissionCreatePage";
import SubmissionEditPage from "./pages/SubmissionEditPage";

function Navbar() {
  return (
    <nav className="bg-white shadow p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link to="/" className="font-bold">
          Home
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Tugas Pendahuluan
          </Link>
          <Link to="/submissions" className="hover:underline">
            Edit Tugas
          </Link>
          <Link
            to="/submissions/new"
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Tambah Tugas
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<AssignmentsPage />} />
          <Route path="/submissions" element={<SubmissionListPage />} />
          <Route path="/submissions/new" element={<SubmissionCreatePage />} />
          <Route
            path="/submissions/:id/edit"
            element={<SubmissionEditPage />}
          />
        </Routes>
      </main>
    </div>
  );
}
