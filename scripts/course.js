const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Introduction to Programming Certificate',
        description: 'An introductory course to programming concepts and problem-solving techniques.',
        technology: ['Python'],
        completed: true // Marked as completed
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web Fundamentals Certificate',
        description: 'Learn the fundamentals of web development, including HTML, CSS, and Git.',
        technology: ['HTML', 'CSS', 'Git'],
        completed: true // Marked as completed
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Programming with Functions Certificate',
        description: 'Learn to write and use functions in Python.',
        technology: ['Python'],
        completed: true // Marked as completed
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Programming with Classes Certificate',
        description: 'Learn to write and use classes in C#.',
        technology: ['C#', 'Object-Oriented Programming','Git'],
        completed: true // Marked as completed
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Dynamic Web Fundamentals Certificate',
        description: 'Build on your web fundamentals knowledge by learning how to create dynamic web pages using JavaScript and jQuery.',
        technology: ['HTML', 'CSS', 'JavaScript','Git'],
        completed: true // Marked as completed
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Frontend Web Development I Certificate',
        description: 'Learn the fundamentals of frontend web development, including HTML, CSS, and JavaScript.',
        technology: ['HTML', 'CSS', 'JavaScript','Git'],
        completed: false
    }
];

const courseContainer = document.querySelector('#courseCards');
const totalCreditsDisplay = document.querySelector('#totalCredits');

function displayCourses(filteredList) {
    // Clear container
    courseContainer.innerHTML = '';

    // Create cards dynamically
    filteredList.forEach(course => {
        const card = document.createElement('div');

        card.className = `course-card ${course.completed ? 'completed' : 'incomplete'}`;

        const checkmark = course.completed ? '✓ ' : '';

        card.innerHTML = `${checkmark}${course.subject} ${course.number}`;

        card.addEventListener('click', () => {
            displayCourseDetails(course);
        });

        courseContainer.appendChild(card);
    });
    // Requirement: Calculate total credits using reduce()
    const total = filteredList.reduce((acc, course) => acc + course.credits, 0);
    totalCreditsDisplay.textContent = `Total Credits: ${total}`;
}

const courseDetails = document.querySelector('#course-details'); 
const closeModal = document.querySelector('#closeModal');

function displayCourseDetails(course) {
    courseDetails.innerHTML = `
        <button  id="closeModal">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Certificate</strong>: ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `;
    courseDetails.showModal();

    const closeModal = document.querySelector('#closeModal');

    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });
}
// Requirement: Filtering logic using array.filter()
document.querySelector('#allBtn').addEventListener('click', () => displayCourses(courses));

document.querySelector('#wddBtn').addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddCourses);
});

document.querySelector('#cseBtn').addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseCourses);
});

// Initial display on load
displayCourses(courses);