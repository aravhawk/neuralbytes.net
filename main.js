// Created by Arav Jain on 7/2/2024

const firebaseConfig = {
    apiKey: "AIzaSyCYvLQ-XTe4E8fXK7pg2OfUrxWKBVgCP24",
    authDomain: "neuralbytes-net.firebaseapp.com",
    projectId: "neuralbytes-net",
    storageBucket: "neuralbytes-net.appspot.com",
    messagingSenderId: "248457682440",
    appId: "1:248457682440:web:23ff34745a17b2ca1d7bbd",
    measurementId: "G-MN0LYT4PFL"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function appendEmail(newEmail) {
    const docRef = db.collection('newsletter').doc('subscribers');
    const doc = await docRef.get();

    if (doc.exists) {
        let emails = doc.data().emails;

        if (!emails) {
            emails = [];
        }

        emails.push(newEmail);

        emails.sort((a, b) => a.localeCompare(b));

        await docRef.update({emails});
    } else {
        await docRef.set({
            emails: [newEmail]
        });
    }

}

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

async function submit_subscribe_form() {
    let email = document.getElementById('subscribe_field').value;
    await appendEmail(email);
    document.getElementById('newsletter_subscribe_under_label').textContent = 'Thanks for subscribing!';
}

function submit_contact_form() {
    let name = document.getElementById('name').value;
    let subject = document.getElementById('subject').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    let mailtoLink = 'mailto:contact@neuralbytes.net?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(message) + '%0A%0AFrom:%0A' + encodeURIComponent(name) + ',%0A' + encodeURIComponent(email);
    window.location.href = mailtoLink;
}
