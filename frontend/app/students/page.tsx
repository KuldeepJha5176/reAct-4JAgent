"use client";

import { useState } from "react";
import { MagnifyingGlass, GraduationCap, Plus } from "@phosphor-icons/react";
import { useStudents } from "@/hooks/useStudents";
import { useModal } from "@/hooks/useModal";
import { Student } from "@/types";
import { TopBar } from "@/components/layout/TopBar";
import { StudentTable, SkeletonRow } from "@/components/students/StudentTable";
import { AddStudentModal } from "@/components/students/AddStudentModal";
import { EditStudentModal } from "@/components/students/EditStudentModal";
import { DeleteConfirmModal } from "@/components/students/DeleteConfirmModal";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorBanner } from "@/components/ui/ErrorBanner";

export default function StudentsPage() {
  const {
    filteredStudents,
    students,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    refresh,
    add,
    updateStudent,
    remove,
  } = useStudents();

  const addModal = useModal();
  const editModal = useModal();
  const deleteModal = useModal();

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  function handleEdit(rollno: number) {
    const s = students.find((s) => s.rollno === rollno) ?? null;
    setSelectedStudent(s);
    editModal.open();
  }

  function handleDelete(rollno: number) {
    const s = students.find((s) => s.rollno === rollno) ?? null;
    setSelectedStudent(s);
    deleteModal.open();
  }

  const headerCols = ["Roll No", "Name", "Class", "Age", "Marks", "Actions"];

  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Students"
        action={
          <Button leftIcon={<Plus size={16} weight="bold" />} onClick={addModal.open}>
            Add Student
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="flex flex-col gap-5 p-6">
          {/* Search */}
          <div className="relative max-w-sm">
            <MagnifyingGlass
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-apple-tertiary"
            />
            <input
              type="text"
              placeholder="Search by name, class, or roll no…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-input border border-apple-border bg-apple-card pl-9 pr-4 text-[14px] text-apple-text placeholder:text-apple-tertiary outline-none focus:border-apple-accent focus:ring-2 focus:ring-apple-accent/20 transition-all"
            />
          </div>

          {error && <ErrorBanner message={error} onRetry={refresh} />}

          {loading && (
            <div className="rounded-apple border border-apple-border bg-apple-card overflow-hidden">
              <div className="grid grid-cols-[80px_1fr_1fr_80px_100px_120px] border-b border-apple-border bg-apple-fill3 px-6 py-2.5">
                {headerCols.map((col) => (
                  <span key={col} className="text-[12px] font-semibold uppercase tracking-wide text-apple-secondary">
                    {col}
                  </span>
                ))}
              </div>
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          )}

          {!loading && !error && students.length === 0 && (
            <EmptyState
              icon={<GraduationCap size={56} />}
              title="No students yet"
              description="Add your first student to get started."
              action={
                <Button leftIcon={<Plus size={16} weight="bold" />} onClick={addModal.open}>
                  Add Student
                </Button>
              }
            />
          )}

          {!loading && !error && students.length > 0 && filteredStudents.length === 0 && (
            <EmptyState
              icon={<MagnifyingGlass size={48} />}
              title="No results"
              description={`No students match "${searchQuery}"`}
            />
          )}

          {!loading && !error && filteredStudents.length > 0 && (
            <StudentTable
              students={filteredStudents}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      <AddStudentModal
        isOpen={addModal.isOpen}
        onClose={addModal.close}
        onAdd={add}
      />
      <EditStudentModal
        isOpen={editModal.isOpen}
        onClose={editModal.close}
        student={selectedStudent}
        onUpdate={updateStudent}
      />
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        student={selectedStudent}
        onDelete={remove}
      />
    </div>
  );
}
