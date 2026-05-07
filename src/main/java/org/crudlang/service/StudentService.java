package org.crudlang.service;

import org.crudlang.entity.Student;

import java.util.List;

public interface StudentService {

    List<Student> getAllStudents();

    Student getStudentByRollno(int rollno);

    String getStudentNameByRollno(int rollno);

    double getMarksByRollno(int rollno);

    double getMarksByName(String name);

    Student addStudent(Student student);

    Student updateMarks(int rollno, double marks);

    Student updateStudent(int rollno, Student updatedDetails);

    void deleteStudent(int rollno);
}
