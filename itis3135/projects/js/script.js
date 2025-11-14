$(document).ready(function() {

    if ($('#featured-carousel').length) {
        $('#featured-carousel').slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 800,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            fade: true,
            cssEase: 'linear'
        });
    }

    const menuContainer = $('#menu-items-container');

    if (menuContainer.length) {
        menuContainer.html('<p style="text-align: center;">Fetching delicious menu items...</p>');

        $.getJSON('data/menu.json')
            .done(function(data) {
                menuContainer.empty(); 
                
                $.each(data, function(i, category) {
                    let categoryHTML = `
                        <div class="menu-category">
                            <h3>${category.category}</h3>
                            <p class="category-description">${category.description}</p>
                            <ul class="item-list">
                    `;
                    
                    $.each(category.items, function(j, item) {
                        categoryHTML += `
                            <li class="menu-item">
                                <h4>${item.name}</h4>
                                <p class="details">${item.details}</p>
                                <p class="price-note">${item.note}</p>
                            </li>
                        `;
                    });

                    categoryHTML += `
                            </ul>
                        </div>
                    `;
                    
                    menuContainer.append(categoryHTML);
                });
            })
            .fail(function(jqxhr, textStatus, error) {
                const err = textStatus + ", " + error;
                menuContainer.html('<p class="error-message">Could not load menu data: ' + err + '</p>');
            });
    }

    console.log("Custom script loaded successfully.");
});

    if ($('#date-needed').length) {
        $("#date-needed").datepicker({
            dateFormat: "yy-mm-dd", 
            minDate: 1, 
            showAnim: "slideDown" 
        });
    }

    $('#order-inquiry-form').on('submit', function(e) {
        let isValid = true;
        const form = $(this);

        const displayError = (id, message) => {
            $(`#${id}-error`).text(message);
            $(`#${id}`).toggleClass('input-error', !!message);
        };
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const name = $('#full-name').val().trim();
        if (name === "") {
            displayError('full-name', 'Your name is required.');
            isValid = false;
        } else {
            displayError('full-name', '');
        }

        const email = $('#email').val().trim();
        if (email === "") {
            displayError('email', 'An email address is required.');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            displayError('email', 'Please enter a valid email format.');
            isValid = false;
        } else {
            displayError('email', '');
        }

        const dateNeeded = $('#date-needed').val();
        if (dateNeeded === "") {
            displayError('date-needed', 'Please select the date you need the order.');
            isValid = false;
        } else {
            displayError('date-needed', '');
        }

        const message = $('#message').val().trim();
        if (message.length < 10) {
            displayError('message', 'Please provide more details (minimum 10 characters).');
            isValid = false;
        } else {
            displayError('message', '');
        }

        if (!isValid) {
            e.preventDefault(); 
            $('#general-error').text('Please correct the errors highlighted above.');
        } else {
            $('#general-error').text('Form is valid. Submitting inquiry...');
        }
    });