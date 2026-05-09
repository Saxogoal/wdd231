const courses = [
    { subject: 'CSE', number: 110, title: 'Intro to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development I', credits: 2, completed: false }
];

function displayCourses(filter = 'all') {
    const container = document.querySelector('#course-list');
    container.innerHTML = "";
    
    const filtered = filter === 'all' ? courses : courses.filter(c => c.subject === filter);
    
    filtered.forEach(course => {
        const div = document.createElement('div');
        // Match wireframe classes
        div.className = `course-card ${course.completed ? 'completed' : 'incomplete'}`;
        
        // Add checkmark if completed as per wireframe
        const checkmark = course.completed ? "✓ " : "";
        div.innerHTML = `${checkmark}${course.subject} ${course.number}`;
        
        container.appendChild(div);
    });

    // Update dynamic numbers
    document.querySelector('#course-count').textContent = filtered.length;
    const total = filtered.reduce((sum, c) => sum + c.credits, 0);
    document.querySelector('#total-credits').textContent = total;
}

document.querySelector('#all').onclick = () => displayCourses('all');
document.querySelector('#cse').onclick = () => displayCourses('CSE');
document.querySelector('#wdd').onclick = () => displayCourses('WDD');

displayCourses();