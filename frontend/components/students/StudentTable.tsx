"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Student } from "@/types";
import { StudentRow } from "./StudentRow";

interface StudentTableProps {
  students: Student[];
  onEdit: (rollno: number) => void;
  onDelete: (rollno: number) => void;
}

const headerCols = ["Roll No", "Name", "Class", "Age", "Marks", "Actions"];

function SkeletonRow() {
  return (
    <div className="grid grid-cols-[80px_1fr_1fr_80px_100px_120px] items-center border-b border-apple-border px-6 py-3.5 gap-4">
      {[40, 120, 80, 30, 50, 60].map((w, i) => (
        <div
          key={i}
          className="h-4 rounded-full bg-apple-fill4 animate-pulse"
          style={{ maxWidth: w }}
        />
      ))}
    </div>
  );
}

export function StudentTable({
  students,
  onEdit,
  onDelete,
}: StudentTableProps) {
  return (
    <div className="rounded-apple border border-apple-border bg-apple-card overflow-hidden">
      <div className="grid grid-cols-[80px_1fr_1fr_80px_100px_120px] border-b border-apple-border bg-apple-fill3 px-6 py-2.5">
        {headerCols.map((col) => (
          <span
            key={col}
            className="text-[12px] font-semibold uppercase tracking-wide text-apple-secondary"
          >
            {col}
          </span>
        ))}
      </div>

      <motion.div
        variants={{ animate: { transition: { staggerChildren: 0.04 } } }}
        initial="initial"
        animate="animate"
      >
        <AnimatePresence mode="popLayout">
          {students.map((student) => (
            <StudentRow
              key={student.rollno}
              student={student}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export { SkeletonRow };
