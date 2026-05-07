import { Student, CreateStudentPayload } from "@/types";
import { apiFetch } from "./client";

export function getAllStudents(): Promise<Student[]> {
  return apiFetch<Student[]>("/students/getall-students");
}

export function getStudent(rollno: number): Promise<Student> {
  return apiFetch<Student>(`/students/${rollno}`);
}

export function addStudent(payload: CreateStudentPayload): Promise<Student> {
  return apiFetch<Student>("/students/add-student", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateMarks(rollno: number, marks: number): Promise<Student> {
  return apiFetch<Student>(`/students/${rollno}/marks?marks=${marks}`, {
    method: "PUT",
  });
}

export function updateStudent(
  rollno: number,
  payload: Partial<Omit<Student, "rollno">>
): Promise<Student> {
  return apiFetch<Student>(`/students/${rollno}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteStudent(rollno: number): Promise<void> {
  return apiFetch<void>(`/students/${rollno}`, { method: "DELETE" });
}
