const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const realStudents = [
  {
    firstName: "Riya",
    lastName: "Sharma",
    name: "Riya Sharma",
    email: "riya.sharma@example.com",
    password: "password123",
    phone: "+91 9876543210",
    role: "pro",
    dob: new Date("1998-05-15"),
    gender: "female",
    category: "General",
    address: "B-21, Lajpat Nagar, New Delhi",
    profilePhoto: "https://i.pravatar.cc/150?u=riya",
    emergencyContact: { name: "Anil Sharma", relationship: "Father", phone: "+91 9123456780" },
    batch: "NORCET 2025 Target",
    examTarget: "NORCET",
    examGoal: "NORCET 2025",
    qualification: "B.Sc Nursing",
    college: "AIIMS Delhi College of Nursing",
    passingYear: "2021",
    registrationNo: "RN1029384Delhi",
    enrolledCourses: ["NORCET 2025 Complete Course", "Live Mock Tests"],
    createdAt: new Date(Date.now() - 2 * 60 * 1000) // 2 mins ago
  },
  {
    firstName: "Priya",
    lastName: "Verma",
    name: "Priya Verma",
    email: "priya.verma@example.com",
    password: "password123",
    phone: "+91 9876500210",
    role: "standard",
    dob: new Date("1999-08-22"),
    gender: "female",
    category: "OBC",
    address: "Sector 15, Noida, UP",
    profilePhoto: "https://i.pravatar.cc/150?u=priya",
    emergencyContact: { name: "Ramesh Verma", relationship: "Father", phone: "+91 9123456701" },
    batch: "AIIMS Nursing 2024",
    examTarget: "AIIMS",
    examGoal: "AIIMS NORCET",
    qualification: "GNM",
    college: "Safdarjung Hospital College of Nursing",
    passingYear: "2022",
    registrationNo: "RN5039284UP",
    enrolledCourses: ["AIIMS Nursing Officer Crash Course"],
    createdAt: new Date(Date.now() - 18 * 60 * 1000) // 18 mins ago
  },
  {
    firstName: "Amit",
    lastName: "Kumar",
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    password: "password123",
    phone: "+91 8876543210",
    role: "basic",
    dob: new Date("1997-11-10"),
    gender: "male",
    category: "SC",
    address: "Jaipur, Rajasthan",
    profilePhoto: "https://i.pravatar.cc/150?u=amit",
    emergencyContact: { name: "Suresh Kumar", relationship: "Father", phone: "+91 8123456780" },
    batch: "SSC Nursing Officer",
    examTarget: "SSC",
    examGoal: "SSC Nursing",
    qualification: "B.Sc Nursing",
    college: "SMS Medical College, Jaipur",
    passingYear: "2020",
    registrationNo: "RN3049586Raj",
    enrolledCourses: ["SSC Nursing Complete Batch"],
    createdAt: new Date(Date.now() - 35 * 60 * 1000) // 35 mins ago
  },
  {
    firstName: "Sneha",
    lastName: "Patil",
    name: "Sneha Patil",
    email: "sneha.patil@example.com",
    password: "password123",
    phone: "+91 9812345678",
    role: "pro",
    dob: new Date("1999-02-28"),
    gender: "female",
    category: "General",
    address: "Pune, Maharashtra",
    profilePhoto: "https://i.pravatar.cc/150?u=sneha",
    emergencyContact: { name: "Vijay Patil", relationship: "Brother", phone: "+91 9823456789" },
    batch: "ESIC Nursing 2024",
    examTarget: "ESIC",
    examGoal: "ESIC Nursing Officer",
    qualification: "P.B. B.Sc Nursing",
    college: "Armed Forces Medical College, Pune",
    passingYear: "2023",
    registrationNo: "RN2049182Mah",
    enrolledCourses: ["ESIC Nursing Comprehensive"],
    createdAt: new Date(Date.now() - 60 * 60 * 1000) // 1 hour ago
  },
  {
    firstName: "Rahul",
    lastName: "Singh",
    name: "Rahul Singh",
    email: "rahul.singh@example.com",
    password: "password123",
    phone: "+91 9998887776",
    role: "free",
    dob: new Date("1996-07-05"),
    gender: "male",
    category: "General",
    address: "Lucknow, UP",
    profilePhoto: "https://i.pravatar.cc/150?u=rahul",
    emergencyContact: { name: "A.K. Singh", relationship: "Father", phone: "+91 9988776655" },
    batch: "General Nursing Prep",
    examTarget: "State PSC",
    examGoal: "UP PSC Nursing Officer",
    qualification: "GNM",
    college: "KGMU College of Nursing",
    passingYear: "2019",
    registrationNo: "RN1059384UP",
    enrolledCourses: [],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  }
];

const seedStudents = async () => {
  try {
    // We do NOT delete the admin users, so we find and delete non-admins
    await User.deleteMany({ role: { $ne: 'admin' } });
    
    // Hash passwords before inserting (since insertMany bypasses the pre-save hook)
    const salt = await bcrypt.genSalt(10);
    const hashedStudents = realStudents.map(student => ({
      ...student,
      password: bcrypt.hashSync(student.password, salt)
    }));

    await User.insertMany(hashedStudents);
    console.log(`✅ Successfully seeded ${realStudents.length} real students!`);
  } catch (error) {
    console.error('Error seeding students:', error);
  }
};

module.exports = seedStudents;
