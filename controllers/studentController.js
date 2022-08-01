const collection = require('firebase/firestore').collection;
const doc = require("firebase/firestore").doc;
const query = require("firebase/firestore").query;
const addDoc = require('firebase/firestore').addDoc;
const getDocs = require('firebase/firestore').getDocs;
const Student = require('../models/student');
const db = require('../db')

const addStudent = async(req, res, next) => {
  try {
    const data = req.body;
    const docRef = await addDoc(collection(db, "users"), data);
    res.send('Record saved successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getAllStudents = async(req, res, next) => {
  try {
    const docRef = await getDocs(collection(db, "users"));
    const studentArray = [];
    if (docRef.empty) {
      res.status(404).send('No student record found')
    } else {
      docRef.forEach(doc => {
        const student = new Student(
          doc.id,
          doc.data().firstName,
          doc.data().lastName,
          doc.data().classEnrolled
        )
        studentArray.push(student);
      });
      res.send(studentArray)
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  addStudent,
  getAllStudents
}