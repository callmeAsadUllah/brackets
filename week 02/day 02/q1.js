function profile(name, age, married, city, education) {
  var student = {
    name: name,
    age: age,
    married: married,
    city: city,
    education: education,
  };
  return student;
}
var student = profile("M. Asad Ullah", 35, true, "Sialkot", "BSCS");
console.log(
  "Name: "
    .concat(student.name, "\nAge: ")
    .concat(student.age, "\nMarried: ")
    .concat(student.married, "\nCity: ")
    .concat(student.city, "\nEducation: ")
    .concat(student.education)
);
