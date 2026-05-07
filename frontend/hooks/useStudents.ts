"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { Student, CreateStudentPayload } from "@/types";
import {
  getAllStudents,
  addStudent,
  updateStudent as apiUpdateStudent,
  deleteStudent,
} from "@/lib/api/students";

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load students");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = useCallback(
    async (payload: CreateStudentPayload) => {
      await addStudent(payload);
      await refresh();
    },
    [refresh]
  );

  const updateStudent = useCallback(
    async (rollno: number, payload: Partial<Omit<Student, "rollno">>) => {
      setStudents((prev) =>
        prev.map((s) => (s.rollno === rollno ? { ...s, ...payload } : s))
      );
      try {
        await apiUpdateStudent(rollno, payload);
        await refresh();
      } catch (e) {
        await refresh();
        throw e;
      }
    },
    [refresh]
  );

  const remove = useCallback(
    async (rollno: number) => {
      const snapshot = students;
      setStudents((prev) => prev.filter((s) => s.rollno !== rollno));
      try {
        await deleteStudent(rollno);
      } catch (e) {
        setStudents(snapshot);
        throw e;
      }
    },
    [students]
  );

  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return students;
    const q = searchQuery.toLowerCase();
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.className.toLowerCase().includes(q) ||
        String(s.rollno).includes(q)
    );
  }, [students, searchQuery]);

  return {
    students,
    filteredStudents,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    refresh,
    add,
    updateStudent,
    remove,
  };
}
