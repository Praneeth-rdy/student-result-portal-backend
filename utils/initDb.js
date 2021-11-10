const { User, Subject, sequelize } = require('../models');

async function initData() {
    sequelize.sync().then(() => {
        console.log('Synced Db');
    });

    const student = await User.create({
        registration_number: 1,
        name: 'Rajesh',
        password: 'Student@123456',
        role: 'student'
    });

    const admin = await User.create({
        registration_number: 2,
        name: 'Shekar',
        password: 'Admin@123456',
        role: 'admin'
    });

    const student2 = await User.create({
        registration_number: 3,
        name: 'Raghu',
        password: 'Student@123456',
        role: 'student'
    });

    const s1 = await Subject.create({
        code: 'SBAA1603',
        name: 'Entrepreneurship Essentials'
    });

    const s2 = await Subject.create({
        code: 'SCSA1401',
        name: 'Object Oriented Analysis and System Engineering'
    });

    const s3 = await Subject.create({
        code: 'SCSA1402',
        name: 'Computer Architecture and Organization'
    });
    const s4 = await Subject.create({
        code: 'SCSA1403',
        name: 'Design and Analysis of Algorithms'
    });
    const s5 = await Subject.create({
        code: 'SECA1404',
        name: 'Microprocessor and Microcontroller Based Systems'
    });
    const s6 = await Subject.create({
        code: 'SMTA1402',
        name: 'Probability and Statistics'
    });
    const s7 = await Subject.create({
        code: 'SCSA2401',
        name: 'Object Oriented Analysis and System Engineering Lab'
    });
    const s8 = await Subject.create({
        code: 'SCSA2402',
        name: 'Code Optimization and Debugging - II'
    });
    const s9 = await Subject.create({
        code: 'SECA2405',
        name: 'Microprocessor and Microcontroller Lab'
    });


    await student.addSubject(s1, {
        through: {
            semester_number: 4,
            marks: 89,
            max_marks: 100,
            remark: 'pass',
        }
    });

    await student.addSubject(s2, {
        through: {
            semester_number: 4,
            marks: 78,
            max_marks: 100,
            remark: 'pass',
        }
    });

    await student.addSubject(s3, {
        through: {
            semester_number: 4,
            marks: 78,
            max_marks: 100,
            remark: 'pass',
        }
    });

    await student.addSubject(s4, {
        through: {
            semester_number: 4,
            marks: 89,
            max_marks: 100,
            remark: 'pass',
        }
    });

    await student.addSubject(s5, {
        through: {
            semester_number: 4,
            marks: 78,
            max_marks: 100,
            remark: 'pass',
        }
    });

    await student.addSubject(s6, {
        through: {
            semester_number: 4,
            marks: 78,
            max_marks: 100,
            remark: 'pass',
        }
    });

    await student.addSubject(s7, {
        through: {
            semester_number: 4,
            marks: 89,
            max_marks: 100,
            remark: 'pass',
        }
    });

    await student.addSubject(s8, {
        through: {
            semester_number: 4,
            marks: 78,
            max_marks: 100,
            remark: 'pass',
        }
    });

    await student.addSubject(s9, {
        through: {
            semester_number: 4,
            marks: 78,
            max_marks: 100,
            remark: 'pass',
        }
    });

}

initData();