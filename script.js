/* ============================================================
   HABLOCLASS — Student Login & Dashboard
   ============================================================ */


/* ============================================================
   TEST STUDENT DATA
   ============================================================ */

const students = [

  {
    id: "0102601",
    code: "1234",
    name: "Olivier GANISHURI",
    cohort: "01",
    year: "2026"
  },

  {
    id: "0202607",
    code: "4821",
    name: "MUSERUKA AIME SERGE",
    cohort: "02",
    year: "2026"
  },

  {
    id: "0302610",
    code: "7359",
    name: "JOHN DOE",
    cohort: "03",
    year: "2026"
  }

];


/* ============================================================
   LOGIN ELEMENTS
   ============================================================ */

const studentIdInput =
  document.getElementById("student-id");

const codeDots =
  document.querySelectorAll(".code-dot");

const digitButtons =
  document.querySelectorAll(".digit");

const clearBtn =
  document.getElementById("clear-btn");

const deleteBtn =
  document.getElementById("delete-btn");

const loginForm =
  document.getElementById("login-form");

const messageEl =
  document.getElementById("message");


/* ============================================================
   DASHBOARD ELEMENTS
   ============================================================ */

const loginPage =
  document.querySelector(".login-card");

const dashboard =
  document.getElementById("student-dashboard");

const dashboardName =
  document.getElementById("dashboard-name");

const dashboardId =
  document.getElementById("dashboard-id");

const dashboardCohort =
  document.getElementById("dashboard-cohort");

const dashboardYear =
  document.getElementById("dashboard-year");


/* ============================================================
   STATE
   ============================================================ */

let personalCode = "";


/* ============================================================
   STUDENT ID INPUT
   ============================================================ */

studentIdInput.addEventListener("input", () => {

  studentIdInput.value =
    studentIdInput.value.replace(/\D/g, "");

});


/* ============================================================
   KEYPAD — DIGITS
   ============================================================ */

digitButtons.forEach((button) => {

  button.addEventListener("click", () => {

    if (personalCode.length < 4) {

      personalCode +=
        button.textContent.trim();

      updateCodeDots();

    }

  });

});


/* ============================================================
   CLEAR BUTTON
   ============================================================ */

clearBtn.addEventListener("click", () => {

  personalCode = "";

  updateCodeDots();

});


/* ============================================================
   DELETE BUTTON
   ============================================================ */

deleteBtn.addEventListener("click", () => {

  personalCode =
    personalCode.slice(0, -1);

  updateCodeDots();

});


/* ============================================================
   UPDATE CODE DOTS
   ============================================================ */

function updateCodeDots() {

  codeDots.forEach((dot, index) => {

    if (index < personalCode.length) {

      dot.setAttribute(
        "data-filled",
        "true"
      );

    } else {

      dot.setAttribute(
        "data-filled",
        "false"
      );

    }

  });

}


/* ============================================================
   SHOW MESSAGE
   ============================================================ */

function showMessage(text, type) {

  messageEl.textContent =
    text;

  messageEl.setAttribute(
    "data-type",
    type
  );

}


/* ============================================================
   LOGIN
   ============================================================ */

loginForm.addEventListener("submit", (event) => {

  event.preventDefault();


  /* ----------------------------------------------------------
     Get Student ID
  ---------------------------------------------------------- */

  const studentId =
    studentIdInput.value.trim();


  /* ----------------------------------------------------------
     Check Student ID
  ---------------------------------------------------------- */

  if (studentId === "") {

    showMessage(
      "Please enter your student ID.",
      "error"
    );

    return;

  }


  /* ----------------------------------------------------------
     Check Student ID Length
  ---------------------------------------------------------- */

  if (studentId.length !== 7) {

    showMessage(
      "Student ID must contain 7 digits.",
      "error"
    );

    return;

  }


  /* ----------------------------------------------------------
     Check Personal Code
  ---------------------------------------------------------- */

  if (personalCode.length !== 4) {

    showMessage(
      "Please enter your 4-digit personal code.",
      "error"
    );

    return;

  }


  /* ----------------------------------------------------------
     Find Matching Student
  ---------------------------------------------------------- */

  const matchedStudent =
    students.find((student) => {

      return (
        student.id === studentId &&
        student.code === personalCode
      );

    });


  /* ==========================================================
     SUCCESSFUL LOGIN
  ========================================================== */

  if (matchedStudent) {

    showMessage(
      `Welcome, ${matchedStudent.name}!`,
      "success"
    );


    /* --------------------------------------------------------
       Put Student Information into Dashboard
    -------------------------------------------------------- */

    dashboardName.textContent =
      matchedStudent.name;

    dashboardId.textContent =
      matchedStudent.id;

    dashboardCohort.textContent =
      matchedStudent.cohort;

    dashboardYear.textContent =
      matchedStudent.year;


    /* --------------------------------------------------------
       Hide Login
    -------------------------------------------------------- */

    loginPage.style.display =
      "none";


    /* --------------------------------------------------------
       Show Dashboard
    -------------------------------------------------------- */

    dashboard.style.display =
      "block";

  }


  /* ==========================================================
     FAILED LOGIN
  ========================================================== */

  else {

    showMessage(
      "Incorrect Student ID or personal code.",
      "error"
    );

  }

});