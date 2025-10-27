// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Get references to all the necessary elements
    const introForm = document.getElementById('intro-form');
    const resultsContainer = document.getElementById('results-container');
    const clearBtn = document.getElementById('clear-btn');
    const addCourseBtn = document.getElementById('add-course');
    const coursesContainer = document.getElementById('courses-container');
  
    /**
     * Main form submission handler
     */
    introForm.addEventListener('submit', (e) => {
      // Prevent the default form submission (which reloads the page)
      e.preventDefault();
  
      // --- 1. Validation ---
      // Check if the form is valid (all 'required' fields are filled)
      // The instruction "prevents the form from submitting w/o the required information"
      // is handled by this check combined with the 'required' attribute in your HTML inputs.
      if (!introForm.checkValidity()) {
        // If not, trigger the browser's built-in validation messages
        introForm.reportValidity();
        return;
      }
  
      // --- 2. Gather Data ---
      // Get simple values
      const imgUrl = document.getElementById('img_url').value;
      const imgCaption = document.getElementById('img_caption').value;
      const aboutMe = document.getElementById('about_me').value;
      const personalBg = document.getElementById('personal_bg').value;
      const profBg = document.getElementById('prof_bg').value;
      const acadBg = document.getElementById('acad_bg').value;
      const computer = document.getElementById('computer').value;
  
      // Get dynamic courses
      let courseListHTML = '';
      const courseEntries = coursesContainer.querySelectorAll('.course-entry');
      
      courseEntries.forEach(entry => {
        // Find the inputs within this specific 'entry' div
        const dept = entry.querySelector('input[name="course_dept"]').value;
        const num = entry.querySelector('input[name="course_num"]').value;
        const name = entry.querySelector('input[name="course_name"]').value;
        const reason = entry.querySelector('input[name="course_reason"]').value;
        
        // Build the HTML list item for this course
        // Only add the list item if all fields for that course are filled
        if (dept && num && name && reason) {
          courseListHTML += `<li>${dept} ${num} - ${name}: ${reason}</li>`;
        }
      });
  
      // --- 3. Build Output HTML ---
      // This HTML structure must EXACTLY match your introduction.html
      const generatedHTML = `
        <figure>
          <img src="${imgUrl}" alt="User's introduction image" class="centered-image"/>
          <figcaption class="center">${imgCaption}</figcaption>
        </figure>
        <section>
          <h3>About Me</h3>
          <p>${aboutMe}</p>
        </section>
        <section>
          <h3>Personal Background</h3>
          <p>${personalBg}</p>
        </section>
        <section>
          <h3>Professional Background</h3>
          <p>${profBg}</p>
        </section>
        <section>
          <h3>Academic Background</h3>
          <p>${acadBg}</p>
        </section>
        <section>
          <h3>Courses I’m Taking, & Why</h3>
          <ul>
            ${courseListHTML}
          </ul>
        </section>
        <section>
          <h3>Primary Computer</h3>
          <p>${computer}</p>
        </section>
        
        <p style="text-align: center; margin-top: 20px;">
          <a href="#" id="reset-page">Create another introduction</a>
        </p>
      `;
  
      // --- 4. Display Results ---
      // Hide the form
      introForm.style.display = 'none';
      // Add the generated HTML to the results container
      resultsContainer.innerHTML = generatedHTML;
    });
  
    /**
     * "Clear" button functionality
     * (Implements the "Clear" button instruction)
     */
    clearBtn.addEventListener('click', () => {
      // Find all input and textarea elements *within the form*
      const allInputs = introForm.querySelectorAll('input, textarea');
      allInputs.forEach(input => {
        // Set their value to an empty string
        input.value = '';
      });
    });
  
    /**
     * "Add Course" button functionality
     * (Implements the "add new course text boxes" instruction)
     */
    addCourseBtn.addEventListener('click', () => {
      // Create a new div to hold the course inputs
      const newCourseEntry = document.createElement('div');
      newCourseEntry.classList.add('course-entry');
      
      // Set its HTML to the same structure as the others (with empty values)
      // Note: These new fields are also 'required' to match the validation logic
      newCourseEntry.innerHTML = `
        <input type="text" name="course_dept" placeholder="Dept" required>
        <input type="text" name="course_num" placeholder="Num" required>
        <input type="text" name="course_name" placeholder="Name" required>
        <input type="text" name="course_reason" placeholder="Reason" required>
        <button type="button" class="delete-course">Delete</button>
      `;
      
      // Add the new set of inputs to the container
      coursesContainer.appendChild(newCourseEntry);
    });
  
    /**
     * "Delete Course" functionality (using Event Delegation)
     * (Implements the "add a delete button" instruction)
     * We listen for clicks on the *container*, then check if the click was on a 'delete-course' button.
     */
    coursesContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-course')) {
        // If 'Delete' was clicked, remove its parent element (the 'course-entry' div)
        e.target.parentElement.remove();
      }
    });
    
    /**
     * "Reset Page" link functionality (using Event Delegation)
     * (Implements the "reset link at the bottom" instruction)
     */
    resultsContainer.addEventListener('click', (e) => {
      if (e.target.id === 'reset-page') {
        e.preventDefault(); // Stop the link from trying to navigate
        
        // Clear the results
        resultsContainer.innerHTML = '';
        
        // Show the form again
        introForm.style.display = 'block';
        
        // Reset the form to its *original pre-filled values*
        // This is the default behavior of <button type="reset">,
        // so we trigger the form's built-in reset() method.
        introForm.reset();
      }
    });
  
    /**
     * "Reset" button functionality
     * (Implements the "reset the progress of the form" instruction)
     * The <button type="reset"> in HTML handles this automatically by
     * reverting fields to their default 'value' attribute.
     * If you wanted to add *extra* logic on reset, you would listen for it:
     *
     * introForm.addEventListener('reset', () => {
     * console.log("Form has been reset to default values!");
     * });
     * * But for this assignment, no extra JS is needed for the reset button itself.
     */
  
  });