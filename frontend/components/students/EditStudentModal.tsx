"use client";

import { useState, FormEvent, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Student } from "@/types";

interface EditStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  onUpdate: (rollno: number, payload: Partial<Omit<Student, "rollno">>) => Promise<void>;
}

interface FormErrors {
  name?: string;
  className?: string;
  age?: string;
  marks?: string;
}

export function EditStudentModal({
  isOpen,
  onClose,
  student,
  onUpdate,
}: EditStudentModalProps) {
  const [form, setForm] = useState({ name: "", className: "", age: "", marks: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (student) {
      setForm({
        name: student.name,
        className: student.className,
        age: String(student.age),
        marks: String(student.marks),
      });
      setErrors({});
      setServerError("");
    }
  }, [student]);

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.className.trim()) e.className = "Class is required";
    const age = Number(form.age);
    if (!form.age || age < 1 || age > 99) e.age = "Enter a valid age (1–99)";
    const marks = Number(form.marks);
    if (form.marks === "" || marks < 0 || marks > 100) e.marks = "Marks must be 0–100";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate() || !student) return;
    setLoading(true);
    setServerError("");
    try {
      await onUpdate(student.rollno, {
        name: form.name.trim(),
        className: form.className.trim(),
        age: Number(form.age),
        marks: Number(form.marks),
      });
      onClose();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit student — Roll #${student?.rollno}`}
      width="md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={errors.name}
            autoFocus
          />
          <Input
            label="Class"
            value={form.className}
            onChange={(e) => setForm({ ...form, className: e.target.value })}
            error={errors.className}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Age"
            type="number"
            min={1}
            max={99}
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            error={errors.age}
          />
          <Input
            label="Marks"
            type="number"
            min={0}
            max={100}
            step={0.1}
            value={form.marks}
            onChange={(e) => setForm({ ...form, marks: e.target.value })}
            error={errors.marks}
          />
        </div>

        {serverError && (
          <p className="text-[13px] text-apple-danger">{serverError}</p>
        )}

        <div className="flex justify-end gap-3 pt-1">
          <Button variant="ghost" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Save changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}
