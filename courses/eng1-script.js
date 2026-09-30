// ==========================================
// HABLOCLASS COURSES
// ==========================================

const courses = [

    {
        id: 1,

        title: "English Foundation",

        description:
            "Build the basic English skills you need for communication.",

        level: "Beginner",

        lessons: [

            {
                id: 1,

                title: "Introducing Yourself",

                reference: "English Foundation - Unit 1",

                vocabulary: [

                    {
                        word: "Name",
                        meaning:
                            "The word used to identify a person."
                    },

                    {
                        word: "Student",
                        meaning:
                            "A person who is learning."
                    },

                    {
                        word: "Speak",
                        meaning:
                            "To communicate using a language."
                    }

                ],

                practice: [

                    {
                        question: "My ___ is Serge.",

                        options: [
                            "name",
                            "speak",
                            "student"
                        ],

                        answer: "name"
                    },

                    {
                        question: "I ___ English.",

                        options: [
                            "name",
                            "speak",
                            "student"
                        ],

                        answer: "speak"
                    },

                    {
                        question: "I am a ___.",

                        options: [
                            "name",
                            "speak",
                            "student"
                        ],

                        answer: "student"
                    }

                ],

                speaking:
                    "Introduce yourself in English."
            }

        ]
    },


    // ======================================
    // SPEAKING PRACTICE
    // ======================================

    {
        id: 2,

        title: "English Speaking Practice",

        description:
            "Practice speaking English in everyday situations.",

        level: "Beginner",

        lessons: [

            {
                id: 1,

                title: "Greetings",

                reference: "Speaking Practice - Unit 1",

                vocabulary: [

                    {
                        word: "Hello",
                        meaning:
                            "A common greeting."
                    },

                    {
                        word: "Good morning",
                        meaning:
                            "A greeting used in the morning."
                    },

                    {
                        word: "How are you?",
                        meaning:
                            "A question asking about someone's condition."
                    }

                ],

                practice: [

                    {
                        question:
                            "What can you say when you meet someone?",

                        options: [
                            "Hello",
                            "Good night",
                            "Goodbye"
                        ],

                        answer: "Hello"
                    }

                ],

                speaking:
                    "Practice a short conversation with another student."
            }

        ]
    }

];


// ==========================================
// DISPLAY COURSES
// ==========================================

function showCourses() {

    const courseContainer =
        document.getElementById("courses");

    courseContainer.innerHTML = "";


    courses.forEach(function(course) {

        const courseCard =
            document.createElement("div");

        courseCard.classList.add("course-card");


        courseCard.innerHTML = `

            <h3>${course.title}</h3>

            <p>
                ${course.description}
            </p>

            <p class="level">
                Level: ${course.level}
            </p>

            <p>
                Lessons: ${course.lessons.length}
            </p>

            <button onclick="openCourse(${course.id})">
                Start Course
            </button>

        `;


        courseContainer.appendChild(courseCard);

    });
}


// ==========================================
// OPEN COURSE
// ==========================================

function openCourse(courseId) {

    const course =
        courses.find(function(course) {

            return course.id === courseId;

        });


    if (!course) {

        console.log("Course not found.");

        return;
    }


    const firstLesson =
        course.lessons[0];


    showLesson(course, firstLesson);
}


// ==========================================
// SHOW LESSON
// ==========================================

function showLesson(course, lesson) {

    const lessonArea =
        document.getElementById("lessonArea");


    let vocabularyHTML = "";


    lesson.vocabulary.forEach(function(item) {

        vocabularyHTML += `

            <div class="vocabulary-item">

                <span class="word">
                    ${item.word}
                </span>

                — ${item.meaning}

            </div>

        `;

    });


    let questionsHTML = "";


    lesson.practice.forEach(function(question, index) {

        let optionsHTML = "";


        question.options.forEach(function(option) {

            optionsHTML += `

                <label class="option">

                    <input
                        type="radio"
                        name="question${index}"
                        value="${option}"
                    >

                    ${option}

                </label>

            `;

        });


        questionsHTML += `

            <div class="question">

                <p>
                    <strong>
                        ${index + 1}. ${question.question}
                    </strong>
                </p>

                ${optionsHTML}

            </div>

        `;

    });


    lessonArea.innerHTML = `

        <div class="lesson">

            <h2>
                ${lesson.title}
            </h2>

            <p class="reference">
                Reference: ${lesson.reference}
            </p>


            <h3>
                Vocabulary
            </h3>

            <div class="vocabulary">

                ${vocabularyHTML}

            </div>


            <div class="practice">

                <h3>
                    Practice
                </h3>

                ${questionsHTML}

                <button onclick="checkPractice(${course.id}, ${lesson.id})">

                    Check Answers

                </button>

                <div id="result"></div>

            </div>


            <div class="speaking">

                <h3>
                    Speaking Practice
                </h3>

                <p>
                    ${lesson.speaking}
                </p>

            </div>

        </div>

    `;
}


// ==========================================
// CHECK PRACTICE
// ==========================================

function checkPractice(courseId, lessonId) {

    const course =
        courses.find(function(course) {

            return course.id === courseId;

        });


    const lesson =
        course.lessons.find(function(lesson) {

            return lesson.id === lessonId;

        });


    let score = 0;


    lesson.practice.forEach(function(question, index) {

        const selected =
            document.querySelector(
                `input[name="question${index}"]:checked`
            );


        if (selected) {

            if (selected.value === question.answer) {

                score++;

            }

        }

    });


    const result =
        document.getElementById("result");


    result.textContent =
        `Your score: ${score}/${lesson.practice.length}`;

}


// ==========================================
// START HABLOCLASS
// ==========================================

showCourses();