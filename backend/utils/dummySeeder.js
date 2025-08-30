const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { faker } = require('@faker-js/faker');
const Student = require('../models/Student');
const connectDB = require('../config/db');

dotenv.config();

const seedStudents = async () => {
  try {
    await connectDB();
    await Student.deleteMany({});

    const students = [];
    const courses = ['B.Tech', 'B.Sc', 'M.Sc', 'MBA', 'PhD'];
    const statuses = ['Active', 'Graduated'];
    const rollNumbers = new Set();

    while (rollNumbers.size < 1000) {
      rollNumbers.add(`R${faker.number.int({ min: 10000, max: 99999 })}`);
    }

    const rollNumberArray = Array.from(rollNumbers);

    for (let i = 0; i < 1000; i++) {
      const studentData = {
        name: faker.person.fullName(),
        rollNumber: rollNumberArray[i],
        course: faker.helpers.arrayElement(courses),
        yearOfStudy: faker.number.int({ min: 1, max: 4 }),
        status: faker.helpers.arrayElement(statuses),
      };
      students.push(studentData);
    }

    await Student.insertMany(students);

    console.log('Inserted 1000 dummy students');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

seedStudents();
