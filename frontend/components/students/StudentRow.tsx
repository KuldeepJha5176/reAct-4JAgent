"use client";

import { motion } from "framer-motion";
import { PencilSimple, Trash } from "@phosphor-icons/react";
import { Student } from "@/types";
import { cn } from "@/lib/utils";

interface StudentRowProps {
  student: Student;
  onEdit: (rollno: number) => void;
  onDelete: (rollno: number) => void;
}

export function StudentRow({ student, onEdit, onDelete }: StudentRowProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className={cn(
        "grid grid-cols-[80px_1fr_1fr_80px_100px_120px]",
        "items-center border-b border-apple-border px-6 py-3.5",
        "hover:bg-apple-fill3 transition-colors duration-100 group"
      )}
    >
      <span className="text-[14px] font-mono text-apple-secondary">
        #{student.rollno}
      </span>
      <span className="text-[15px] font-medium text-apple-text">
        {student.name}
      </span>
      <span className="text-[14px] text-apple-secondary">
        {student.className}
      </span>
      <span className="text-[14px] text-apple-secondary">{student.age}</span>
      <span className="text-[15px] font-semibold text-apple-text">
        {student.marks.toFixed(1)}
      </span>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <button
          onClick={() => onEdit(student.rollno)}
          className={cn(
            "flex size-8 items-center justify-center rounded-[7px]",
            "text-apple-secondary hover:bg-apple-fill4 hover:text-apple-text",
            "transition-colors duration-100"
          )}
          title="Edit marks"
        >
          <PencilSimple size={15} weight="bold" />
        </button>
        <button
          onClick={() => onDelete(student.rollno)}
          className={cn(
            "flex size-8 items-center justify-center rounded-[7px]",
            "text-apple-secondary hover:text-apple-danger",
            "transition-colors duration-100"
          )}
          title="Delete student"
        >
          <Trash size={15} weight="bold" />
        </button>
      </div>
    </motion.div>
  );
}
