// Created by Arav Jain on 7/2/2024

// Replace this with your deployed Cloud Function URL after running `firebase deploy`
const SUBSCRIBE_ENDPOINT = "/api/subscribe";

async function appendEmail(newEmail) {
    const response = await fetch(SUBSCRIBE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Subscription failed.");
    }

    return data;
}


function typewriter_header() {
    const main_page_header_text = "Building AI-integrated experiences and experiments";
    const typewriterElement = document.getElementById('main_page_header');
    let main_page_header_text_chunk = "";
    let i = 0;

    function type() {
        if (i < main_page_header_text.length) {
            let main_page_header_text_char = main_page_header_text[i];
            main_page_header_text_chunk += main_page_header_text_char;
            typewriterElement.innerHTML = main_page_header_text_chunk + "<span class='blinking-cursor'>▌</span>";
            i++;
            setTimeout(type, 80);
        } else {
            typewriterElement.innerHTML = main_page_header_text_chunk + "<span class='blinking-cursor'>▌</span>";
        }
    }

    type();
}

document.addEventListener('DOMContentLoaded', typewriter_header);

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

async function submit_subscribe_form() {
    let email = document.getElementById('subscribe_field').value;
    if (email.length > 0) {
        if (validateEmail(email)) {
            try {
                await appendEmail(email);
                document.getElementById('newsletter_subscribe_under_label').textContent = 'Thanks for subscribing!';
            } catch (error) {
                document.getElementById('newsletter_subscribe_under_label').textContent = error.message;
            }
        } else {
            document.getElementById('newsletter_subscribe_under_label').textContent = 'Please enter a valid email address.';
        }
    } else {
        document.getElementById('newsletter_subscribe_under_label').textContent = 'Please enter your email.';
    }
}

function submit_contact_form() {
    let name = document.getElementById('name').value;
    let subject = document.getElementById('subject').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    let mailtoLink = 'mailto:contact@neuralbytes.net?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(message) + '%0A%0AFrom:%0A' + encodeURIComponent(name) + ',%0A' + encodeURIComponent(email);
    window.location.href = mailtoLink;
}
