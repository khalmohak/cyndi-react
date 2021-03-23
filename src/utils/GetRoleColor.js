import {makeStyles} from "@material-ui/core";

const styleStudent = makeStyles((theme) => ({
  color: {
    backgroundColor: theme.palette.colorPrimaryStudent.main
  }
}));

const styleTeacher = makeStyles((theme) => ({
  color: {
    backgroundColor: theme.palette.colorPrimaryTeacher.main
  }
}));

const styleExpert = makeStyles((theme) => ({
  color: {
    backgroundColor: theme.palette.colorPrimaryExpert.main
  }
}));

const styleEmployee = makeStyles((theme) => ({
  color: {
    backgroundColor: theme.palette.colorPrimaryEmployee.main
  }
}));

const styleGuest = makeStyles((theme) => ({
  color: {
    backgroundColor: theme.palette.colorPrimaryGuest.main
  }
}));

const styleCompanyHR = makeStyles((theme) => ({
  color: {
    backgroundColor: theme.palette.colorPrimaryCompanyHR.main
  }
}));

const styleAlumnus = makeStyles((theme) => ({
  color: {
    backgroundColor: theme.palette.colorPrimaryAlumnus.main
  }
}));

export const getRoleColor = () => {
  const role = sessionStorage.getItem('userRole');

  let color;
  switch (role) {
    case "Student":
      color = styleStudent().color;
      break;
    case "Teacher":
      color = styleTeacher().color;
      break;
    case "Expert":
      color = styleExpert().color;
      break;
    case "Guest":
      color = styleGuest().color;
      break;
    case "Alumnus":
      color = styleAlumnus().color;
      break;
    case "CompanyHR":
      color = styleCompanyHR().color;
      break;
    case "Employee":
      color = styleEmployee().color;
      break;
    default:
      color = styleStudent().color;
      break;
  }
  return color;
};

