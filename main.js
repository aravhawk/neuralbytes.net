// Created by Arav Jain on 7/2/2024

function open_neuralbytes_search() {
    window.open('https://neuralbytes-search.streamlit.app', '_blank');
}

function typewriter_header() {
    const main_page_header_text = "Integrating AI to create breakthrough tools and experiences";
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

function submit_subscribe_form() {
    let email = document.getElementById('subscribe_field').value;
    let mailtoLink = 'mailto:contact@neuralbytes.net?subject=Subscribe to the NeuralBytes Newsletter' + '&body=Email%20for%20registration:%20' + encodeURI(email);
    window.location.href = mailtoLink;
}

function submit_contact_form() {
    let name = document.getElementById('name').value;
    let subject = document.getElementById('subject').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    let mailtoLink = 'mailto:contact@neuralbytes.net?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(message) + '%0A%0AFrom:%0A' + encodeURIComponent(name) + ',%0A' + encodeURIComponent(email);
    window.location.href = mailtoLink;
}
