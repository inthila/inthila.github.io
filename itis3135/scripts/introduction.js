// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Get references to all the necessary elements ---
    // CHANGED: Matched all IDs to your new HTML (e.g., 'introForm', 'output-container')
    const introForm = document.getElementById('introForm'); 
    const outputContainer = document.getElementById('output-container'); 
    const clearBtn = document.getElementById('clear-btn');
    const addCourseBtn = document.getElementById('add-course');
    const coursesContainer = document.getElementById('courses-container');
  
    // Exit if the form isn't on this page
    if (!introForm) {
      return;
    }
  
    /**
     * Main form submission handler
     */
    introForm.addEventListener('submit', (e) => {
      // Prevent the default form submission (which reloads the page)
      e.preventDefault();
  
      // --- 2. Validation ---
      if (!introForm.checkValidity()) {
        introForm.reportValidity();
        return;
      }
  
      // --- 3. Gather Data ---
      
      // --- Handle File Input ---
      // CHANGED: This is a major update to handle the <input type="file">
      const pictureInput = document.getElementById('picture');
      let imageUrl;
  
      if (pictureInput.files.length > 0) {
        // If a new file is uploaded, create a temporary URL for it
        imageUrl = URL.createObjectURL(pictureInput.files[0]);
      } else {
        // Otherwise, use the default image from your original introduction page
        imageUrl = "images/inthilainlaos.jpeg"; 
      }
  
      // CHANGED: Matched all element IDs to your HTML (e.g., 'caption', 'aboutMe')
      const imgCaption = document.getElementById('caption').value;
      const aboutMe = document.getElementById('aboutMe').value;
      const personalBg = document.getElementById('personalBg').value;
      const profBg = document.getElementById('professionalBg').value;
      const acadBg = document.getElementById('academicBg').value;
      const computer = document.getElementById('primaryComputer').value;
  
      // --- Get dynamic courses ---
      let courseListHTML = '';
      const courseEntries = coursesContainer.querySelectorAll('.course-entry');
      
      courseEntries.forEach(entry => {
        // CHANGED: Matched all input 'name' attributes (e.g., 'courseDept')
        const dept = entry.querySelector('input[name="courseDept"]').value;
        const num = entry.querySelector('input[name="courseNum"]').value;
        const name = entry.querySelector('input[name="courseName"]').value;
        const reason = entry.querySelector('input[name="courseReason"]').value;
        
        if (dept && num && name && reason) {
          courseListHTML += `<li>${dept} ${num} - ${name}: ${reason}</li>`;
        }
      });
  
      // --- 4. Build Output HTML ---
      // This HTML structure must EXACTLY match your introduction.html
      const generatedHTML = `
        <figure>
          <img src="${imageUrl}" alt="User's introduction image" class="centered-image"/>
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
  
      // --- 5. Display Results ---
      // CHANGED: Hide the form container and show the output container
      document.getElementById('form-container').style.display = 'none'; 
      outputContainer.innerHTML = generatedHTML;
      outputContainer.style.display = 'block'; 
    });
  
    /**
     * "Clear" button functionality
     */
    clearBtn.addEventListener('click', () => {
      // Find all input and textarea elements *within the form*
      const allInputs = introForm.querySelectorAll('input, textarea');
      allInputs.forEach(input => {
        // Clear all fields, including the file input
        if (input.type === 'file') {
          input.value = null;
        } else {
          input.value = '';
        }
      });
    });
  
    /**
     * "Add Course" button functionality
     */
    addCourseBtn.addEventListener('click', () => {
      const newCourseEntry = document.createElement('div');
      newCourseEntry.classList.add('course-entry');
      
      // CHANGED: Updated innerHTML to match your new HTML's 'name' attributes (e.g., 'courseDept')
      // and button text
      newCourseEntry.innerHTML = `
        <input type="text" name="courseDept" placeholder="Dept" required>
        <input type="text" name="courseNum" placeholder="Num" required>
        <input type="text" name="courseName" placeholder="Name" required>
        <input type="text" name="courseReason" placeholder="Reason" required>
        <button type="button" class="delete-course">Remove</button>
      `;
      
      coursesContainer.appendChild(newCourseEntry);
    });
  
    /**
     * "Delete Course" functionality (using Event Delegation)
     */
    coursesContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-course')) {
        e.target.parentElement.remove();
      }
    });
    
    /**
     * "Reset Page" link functionality (using Event Delegation)
     */
    outputContainer.addEventListener('click', (e) => {
      if (e.target.id === 'reset-page') {
        e.preventDefault(); // Stop the link from trying to navigate
        
        // Clear the results and hide the container
        outputContainer.innerHTML = '';
        outputContainer.style.display = 'none';
        
        // Show the form again
        document.getElementById('form-container').style.display = 'block';
        
        // Reset the form to its *original pre-filled values*
        introForm.reset();
      }
    });
  
  });