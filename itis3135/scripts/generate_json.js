document.addEventListener('DOMContentLoaded', () => {

    const jsonButton = document.getElementById('generate-json-btn');
    const formContainer = document.getElementById('form-container');
    const outputContainer = document.getElementById('output-container');
    const mainHeader = document.querySelector('main h2');

    jsonButton.addEventListener('click', () => {
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const imageCaption = document.getElementById('caption').value;
        const personalStatement = document.getElementById('aboutMe').value; 
        const personalBackground = document.getElementById('personalBg').value;
        const professionalBackground = document.getElementById('professionalBg').value;
        const academicBackground = document.getElementById('academicBg').value;
        const primaryComputer = document.getElementById('primaryComputer').value;

        const courses = [];
        const courseEntries = document.querySelectorAll('#courses-container .course-entry');
        
        courseEntries.forEach(entry => {
            const course = {
                department: entry.querySelector('input[name="courseDept"]').value,
                number: entry.querySelector('input[name="courseNum"]').value,
                name: entry.querySelector('input[name="courseName"]').value,
                reason: entry.querySelector('input[name="courseReason"]').value
            };
            courses.push(course);
        });

        const links = [
            { name: "GitHub", href: "https://github.com/inthila" },
            { name: "GitHub Page", href: "https://inthila.github.io/" },
            { name: "freeCodeCamp", href: "https://www.freecodecamp.org/inthila-chanthirat" },
            { name: "Codecademy", href: "https://www.codecademy.com/profiles/ichanthi" },
            { name: "LinkedIn", href: "https://www.linkedin.com/in/inthila-chanthirat" }
        ];

        const introData = {
            "firstName": firstName,
            "preferredName": firstName, 
            "middleInitial": "K", 
            "lastName": lastName,
            "divider": "~",
            "mascotAdjective": "Interesting",
            "mascotAnimal": "Capybara",
            "image": "../images/inthilainlaos.jpeg",
            "imageCaption": imageCaption,
            "personalStatement": personalStatement,
            "personalBackground": personalBackground,
            "professionalBackground": professionalBackground,
            "academicBackground": academicBackground,
            "subjectBackground": "My academic focus is on web development and cybersecurity.", // Make sure this is what you want!
            "primaryComputer": primaryComputer,
            "courses": courses,
            "links": links
        };

        const jsonString = JSON.stringify(introData, null, 2);

        mainHeader.textContent = "Introduction HTML";

        const outputHTML = `
            <section id="json-output">
                <h3>Introduction JSON</h3>
                <p>Here is the JSON data generated from the form. You can copy-paste this.</p>
                <pre><code class="language-json">${jsonString}</code></pre>
            </section>
        `;

        formContainer.style.display = 'none';
        outputContainer.innerHTML = outputHTML;
        outputContainer.style.display = 'block';

        const codeBlock = outputContainer.querySelector('code.language-json');
        if (typeof hljs !== 'undefined') {
            hljs.highlightElement(codeBlock);
        } else {
            console.error('Highlight.js is not loaded.');
        }
    });
});