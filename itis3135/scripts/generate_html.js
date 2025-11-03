document.addEventListener('DOMContentLoaded', () => {

    const htmlButton = document.getElementById('generate-html-btn');
    const formContainer = document.getElementById('form-container');
    const outputContainer = document.getElementById('output-container');
    const mainHeader = document.querySelector('main h2');

    function escapeHTML(str) {
        return str.replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;');
    }

    htmlButton.addEventListener('click', () => {
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const middleInitial = "K"; 
        const preferredName = document.getElementById('firstName').value;
        const mascotAdjective = "Interesting";
        const mascotAnimal = "Capybara";
        const image = "../images/inthilainlaos.jpeg"; 
        const imageCaption = document.getElementById('caption').value;
        const personalStatement = document.getElementById('aboutMe').value; 
        const personalBackground = document.getElementById('personalBg').value;
        const professionalBackground = document.getElementById('professionalBg').value;
        const academicBackground = document.getElementById('academicBg').value;
        const subjectBackground = "My academic focus is on web development and cybersecurity.";
        const primaryComputer = document.getElementById('primaryComputer').value;

        const courses = [];
        const courseEntries = document.querySelectorAll('#courses-container .course-entry');
        courseEntries.forEach(entry => {
            courses.push({
                department: entry.querySelector('input[name="courseDept"]').value,
                number: entry.querySelector('input[name="courseNum"]').value,
                name: entry.querySelector('input[name="courseName"]').value,
                reason: entry.querySelector('input[name="courseReason"]').value
            });
        });

        let courseListHTML = '';
        courses.forEach(course => {
            courseListHTML += `
        <li>${course.department} ${course.number} - ${course.name}: ${course.reason}</li>`;
        });
        
        const generatedHTML = `
<h2>Introduction HTML</h2>
<h3>${firstName} ${middleInitial}. "${preferredName}" ${lastName} ★ ${mascotAdjective} ${mascotAnimal}</h3>
<figure>
    <img
        src="${image}"
        alt="Headshot of ${firstName} ${lastName}"
    />
    <figcaption>${imageCaption}</figcaption>
</figure>
<ul>
    <li>
        <strong>Personal Statement:</strong> ${personalStatement}
    </li>
    <li>
        <strong>Personal Background:</strong> ${personalBackground}
    </li>
    <li>
        <strong>Professional Background:</strong> ${professionalBackground}
    </li>
    <li>
        <strong>Academic Background:</strong> ${academicBackground}
    </li>
    <li>
        <strong>Subject Background:</strong> ${subjectBackground}
    </li>
    <li>
        <strong>Primary Computer:</strong> ${primaryComputer}
    </li>
</ul>

<h3>Courses I'm Taking</h3>
<ul>${courseListHTML}
</ul>
`;

        const escapedHTML = escapeHTML(generatedHTML);

        mainHeader.textContent = "Introduction HTML";

        const outputHTML = `
            <section id="html-output">
                <h3>Generated Introduction HTML</h3>
                <p>Here is the HTML code generated from the form. You can copy-paste this.</p>
                <pre><code class="language-html">${escapedHTML}</code></pre>
            </section>
        `;

        formContainer.style.display = 'none';
        outputContainer.innerHTML = outputHTML;
        outputContainer.style.display = 'block';

        const codeBlock = outputContainer.querySelector('code.language-html');
        if (typeof hljs !== 'undefined') {
            hljs.highlightElement(codeBlock);
        } else {
            console.error('Highlight.js is not loaded.');
        }
    });
});