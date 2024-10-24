interface Profile {
  name: string;
  age: number;
  married: boolean;
  city: string;
  education: string;
}

function profile(
  name: string,
  age: number,
  married: boolean,
  city: string,
  education: string
): Profile {
  const student = {
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
  `Name: ${student.name}\nAge: ${student.age}\nMarried: ${student.married}\nCity: ${student.city}\nEducation: ${student.education}`
);
