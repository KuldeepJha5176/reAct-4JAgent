"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Student } from "@/types";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  onDelete: (rollno: number) => Promise<void>;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  student,
  onDelete,
}: DeleteConfirmModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    if (!student) return;
    setLoading(true);
    setError("");
    try {
      await onDelete(student.rollno);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Student" width="sm">
      <div className="flex flex-col gap-5">
        <p className="text-[15px] text-apple-secondary">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-apple-text">
            {student?.name}
          </span>
          ? This action cannot be undone.
        </p>

        {error && (
          <p className="text-[13px] text-apple-danger">{error}</p>
        )}

        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} loading={loading}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
