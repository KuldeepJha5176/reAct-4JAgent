"use client";

import { useState, FormEvent } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CreateStudentPayload } from "@/types";

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (payload: CreateStudentPayload) => Promise<void>;
}

interface FormErrors {
  rollno?: string;
  name?: string;
  className?: string;
  age?: string;
  marks?: string;
}

export function AddStudentModal({ isOpen, onClose, onAdd }: AddStudentModalProps) {
  const [form, setForm] = useState({
    rollno: "",
    name: "",
    className: "",
    age: "",
    marks: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.rollno || Number(form.rollno) <= 0) e.rollno = "Enter a valid roll number";
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.className.trim()) e.className = "Class is required";
    const age = Number(form.age);
    if (!form.age || age < 1 || age > 99) e.age = "Enter a valid age (1–99)";
    const marks = Number(form.marks);
    if (!form.marks || marks < 0 || marks > 100) e.marks = "Marks must be 0–100";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");
    try {
      await onAdd({
        rollno: Number(form.rollno),
        name: form.name.trim(),
        className: form.className.trim(),
        age: Number(form.age),
        marks: Number(form.marks),
      });
      setForm({ rollno: "", name: "", className: "", age: "", marks: "" });
      setErrors({});
      onClose();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Failed to add student");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setForm({ rollno: "", name: "", className: "", age: "", marks: "" });
    setErrors({});
    setServerError("");
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Student" width="md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Roll Number"
            type="number"
            min={1}
            value={form.rollno}
            onChange={(e) => setForm({ ...form, rollno: e.target.value })}
            error={errors.rollno}
            placeholder="e.g. 101"
          />
          <Input
            label="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={errors.name}
            placeholder="e.g. Arjun Sharma"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Class"
            value={form.className}
            onChange={(e) => setForm({ ...form, className: e.target.value })}
            error={errors.className}
            placeholder="e.g. 10A"
          />
          <Input
            label="Age"
            type="number"
            min={1}
            max={99}
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            error={errors.age}
            placeholder="e.g. 16"
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
            placeholder="e.g. 87.5"
          />
        </div>

        {serverError && (
          <p className="text-[13px] text-apple-danger">{serverError}</p>
        )}

        <div className="flex justify-end gap-3 pt-1">
          <Button variant="ghost" onClick={handleClose} type="button">
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Add Student
          </Button>
        </div>
      </form>
    </Modal>
  );
}
