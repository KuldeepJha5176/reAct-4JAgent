package org.crudlang.controller;

import org.crudlang.entity.Student;
import org.crudlang.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Get all students
    @GetMapping("/getall-students")
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    // Get student details by rollno
    @GetMapping("/{rollno}")
    public ResponseEntity<Student> getStudentByRollno(@PathVariable int rollno) {
        return ResponseEntity.ok(studentService.getStudentByRollno(rollno));
    }

    // Get student name by rollno
    @GetMapping("/{rollno}/name")
    public ResponseEntity<String> getStudentNameByRollno(@PathVariable int rollno) {
        return ResponseEntity.ok(studentService.getStudentNameByRollno(rollno));
    }

    // Get marks by rollno or name: /students/marks?rollno=1  OR  /students/marks?name=John
    @GetMapping("/marks")
    public ResponseEntity<Double> getMarks(
            @RequestParam(required = false) Integer rollno,
            @RequestParam(required = false) String name) {
        if (rollno != null) {
            return ResponseEntity.ok(studentService.getMarksByRollno(rollno));
        } else if (name != null) {
            return ResponseEntity.ok(studentService.getMarksByName(name));
        }
        return ResponseEntity.badRequest().build();
    }

    // Add a new student
    @PostMapping("/add-student")
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        return ResponseEntity.ok(studentService.addStudent(student));
    }

    // Update marks by rollno: /students/1/marks?marks=95.5
    @PutMapping("/{rollno}/marks")
    public ResponseEntity<Student> updateMarks(@PathVariable int rollno, @RequestParam double marks) {
        return ResponseEntity.ok(studentService.updateMarks(rollno, marks));
    }

    // Update student details (name, className, age, marks) by rollno
    @PutMapping("/{rollno}")
    public ResponseEntity<Student> updateStudent(@PathVariable int rollno, @RequestBody Student student) {
        return ResponseEntity.ok(studentService.updateStudent(rollno, student));
    }

    // Delete student by rollno
    @DeleteMapping("/{rollno}")
    public ResponseEntity<String> deleteStudent(@PathVariable int rollno) {
        studentService.deleteStudent(rollno);
        return ResponseEntity.ok("Student with rollno " + rollno + " deleted successfully");
    }
}
