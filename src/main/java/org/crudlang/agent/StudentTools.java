package org.crudlang.agent;

import dev.langchain4j.agent.tool.Tool;
import org.crudlang.entity.Student;
import org.crudlang.service.StudentService;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class StudentTools {

    private final StudentService studentService;

    public StudentTools(StudentService studentService) {
        this.studentService = studentService;
    }

    @Tool("Get all students. Returns a list of all student records.")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @Tool("Get full details of a student by their roll number.")
    public Student getStudentByRollno(int rollno) {
        try {
            return studentService.getStudentByRollno(rollno);
        } catch (RuntimeException e) {
            return null;
        }
    }

    @Tool("Get marks of a student. Provide either rollno (integer) or name (string). Pass -1 for rollno if using name, null for name if using rollno.")
    public String getMarks(int rollno, String name) {
        try {
            if (rollno > 0) {
                return String.valueOf(studentService.getMarksByRollno(rollno));
            } else if (name != null && !name.isBlank()) {
                return String.valueOf(studentService.getMarksByName(name));
            }
            return "Error: provide either rollno or name";
        } catch (RuntimeException e) {
            return "Error: " + e.getMessage();
        }
    }

    @Tool("Add a new student. All five fields are required: rollno, name, className, age, marks.")
    public String addStudent(int rollno, String name, String className, int age, double marks) {
        try {
            Student s = new Student();
            s.setRollno(rollno);
            s.setName(name);
            s.setClassName(className);
            s.setAge(age);
            s.setMarks(marks);
            studentService.addStudent(s);
            return "Student " + name + " added successfully with rollno " + rollno;
        } catch (RuntimeException e) {
            return "Error: " + e.getMessage();
        }
    }

    @Tool("Update marks of a student by roll number.")
    public String updateMarks(int rollno, double marks) {
        try {
            studentService.updateMarks(rollno, marks);
            return "Marks updated to " + marks + " for rollno " + rollno;
        } catch (RuntimeException e) {
            return "Error: " + e.getMessage();
        }
    }

    @Tool("Update marks of a student by their name. Use this when only the student's name is known.")
    public String updateMarksByName(String name, double marks) {
        try {
            List<Student> all = studentService.getAllStudents();
            Student student = all.stream()
                    .filter(s -> s.getName().equalsIgnoreCase(name))
                    .findFirst()
                    .orElse(null);
            if (student == null) {
                return "Error: No student found with name '" + name + "'";
            }
            studentService.updateMarks(student.getRollno(), marks);
            return "Marks updated to " + marks + " for " + student.getName() + " (rollno " + student.getRollno() + ")";
        } catch (RuntimeException e) {
            return "Error: " + e.getMessage();
        }
    }

    @Tool("Delete a student by their roll number.")
    public String deleteStudent(int rollno) {
        try {
            studentService.deleteStudent(rollno);
            return "Student with rollno " + rollno + " deleted successfully";
        } catch (RuntimeException e) {
            return "Error: " + e.getMessage();
        }
    }
}
