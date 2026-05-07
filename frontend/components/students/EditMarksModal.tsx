"use client";

import { useState, FormEvent, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Student } from "@/types";

interface EditMarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  onEdit: (rollno: number, marks: number) => Promise<void>;
}

export function EditMarksModal({
  isOpen,
  onClose,
  student,
  onEdit,
}: EditMarksModalProps) {
  const [marks, setMarks] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (student) setMarks(String(student.marks));
  }, [student]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const val = Number(marks);
    if (!marks || val < 0 || val > 100) {
      setError("Marks must be between 0 and 100");
      return;
    }
    if (!student) return;
    setLoading(true);
    setError("");
    try {
      await onEdit(student.rollno, val);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit marks — ${student?.name ?? ""}`}
      width="sm"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Marks"
          type="number"
          min={0}
          max={100}
          step={0.1}
          value={marks}
          onChange={(e) => {
            setMarks(e.target.value);
            setError("");
          }}
          error={error}
          autoFocus
        />
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}
