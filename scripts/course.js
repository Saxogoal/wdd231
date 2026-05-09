const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        completed: true // Marked as completed
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        completed: true // Marked as completed
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        completed: true // Marked as completed
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        completed: true // Marked as completed
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
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
        
        // Add checkmark for completed courses as seen in wireframe
        const checkmark = course.completed ? '✓ ' : '';
        card.innerHTML = `${checkmark}${course.subject} ${course.number}`;
        
        courseContainer.appendChild(card);
    });

    // Requirement: Calculate total credits using reduce()
    const total = filteredList.reduce((acc, course) => acc + course.credits, 0);
    totalCreditsDisplay.textContent = `Total Credits: ${total}`;
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