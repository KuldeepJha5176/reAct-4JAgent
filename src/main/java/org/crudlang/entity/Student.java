package org.crudlang.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {

    @Id
    private int rollno;

    private String name;

    @Column(name = "class")
    private String className;

    private int age;

    private double marks;

    public int getRollno() { return rollno; }
    public void setRollno(int rollno) { this.rollno = rollno; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getClassName() { return className; }
    public void setClassName(String className) { this.className = className; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public double getMarks() { return marks; }
    public void setMarks(double marks) { this.marks = marks; }
}
