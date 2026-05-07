package org.crudlang.service;

import org.crudlang.entity.Student;
import org.crudlang.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student getStudentByRollno(int rollno) {
        return studentRepository.findById(rollno)
                .orElseThrow(() -> new RuntimeException("Student not found with rollno: " + rollno));
    }

    @Override
    public String getStudentNameByRollno(int rollno) {
        return getStudentByRollno(rollno).getName();
    }

    @Override
    public double getMarksByRollno(int rollno) {
        return getStudentByRollno(rollno).getMarks();
    }

    @Override
    public double getMarksByName(String name) {
        return studentRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Student not found with name: " + name))
                .getMarks();
    }

    @Override
    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public Student updateMarks(int rollno, double marks) {
        Student student = getStudentByRollno(rollno);
        student.setMarks(marks);
        return studentRepository.save(student);
    }

    @Override
    public Student updateStudent(int rollno, Student updatedDetails) {
        Student student = getStudentByRollno(rollno);
        if (updatedDetails.getName() != null) student.setName(updatedDetails.getName());
        if (updatedDetails.getClassName() != null) student.setClassName(updatedDetails.getClassName());
        if (updatedDetails.getAge() > 0) student.setAge(updatedDetails.getAge());
        if (updatedDetails.getMarks() >= 0) student.setMarks(updatedDetails.getMarks());
        return studentRepository.save(student);
    }

    @Override
    public void deleteStudent(int rollno) {
        studentRepository.deleteById(rollno);
    }
}
