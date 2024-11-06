let addButton = document.getElementById("add");
let overlay = document.getElementById("overlay");
let nameInput = document.getElementById("name-input");
let phoneInput = document.getElementById("phone-input");
let emailInput = document.getElementById("email-input");
let address = document.getElementById("add-input");
let editmode = document.getElementById("edit-mode")
let newNameI = document.getElementById("new-name");
let newPhoneI = document.getElementById("new-phone");
let newEmailI = document.getElementById("new-email");
let newAddressI = document.getElementById("new-address");


function saveContacts(contacts) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function loadContacts() {
    const contactsData = localStorage.getItem('contacts');
    return contactsData ? JSON.parse(contactsData) : [];
}

function displayContacts(contactsToDisplay = null) {
    const contactList = document.getElementById('list');
    const contacts = loadContacts();
    const displayContacts = contactsToDisplay || contacts;

    contactList.innerHTML = '';

    for (let i = 0; i < displayContacts.length; i++) {
        let contact = displayContacts[i];
        contactList.innerHTML += `
            <div class="contact-card">
                <h3 id="namedisplay">${contact.nameValue}</h3>
                <p class="info">${contact.phoneValue}</p>
                <p class="info">${contact.emailValue}</p>
                <p class="info">${contact.addressValue}</p>
                <button class="btn-view" onclick="editMode(${i})">Edit</button> 
                <button class="btn-view" onclick="deleteContact(${i})">Delete</button>
            </div>
        `;
    }
}

function openAdd() {
    overlay.style.display = "flex";
}

function addContact() {
    let nameValue = nameInput.value;
    let phoneValue = phoneInput.value;
    let emailValue = emailInput.value;
    let addressValue = address.value;

    if (nameValue === "" || phoneValue === "" || emailValue === "" || addressValue === "") {
        alert("Please fill in all fields!");
    } else {
        overlay.style.display = "none"; 

        const newContact = { nameValue, phoneValue, emailValue, addressValue };
        const contacts = loadContacts();
        contacts.push(newContact);

        saveContacts(contacts);
        displayContacts(); 

        nameInput.value = "";
        phoneInput.value = "";
        emailInput.value = "";
        address.value = "";
    }
}

function closeOver() {
    overlay.style.display = "none";
}

function editMode(index) {
    editmode.style.display = "flex";
    const contacts = loadContacts();
    const contact = contacts[index];

    newNameI.value = contact.nameValue;
    newPhoneI.value = contact.phoneValue;
    newEmailI.value = contact.emailValue;
    newAddressI.value = contact.addressValue;

    const updateButton = document.getElementById("update");
    updateButton.onclick = function () {
        updateContact(index);
    };
}

function deleteContact(index) {
    const contacts = loadContacts();
    contacts.splice(index, 1); 
    saveContacts(contacts); 
    displayContacts(); 
}

function updateContact(index) {
    const contacts = loadContacts();

    const updatedContact = {
        nameValue: newNameI.value,
        phoneValue: newPhoneI.value,
        emailValue: newEmailI.value,
        addressValue: newAddressI.value
    };

    contacts[index] = updatedContact;

    saveContacts(contacts);

    displayContacts();

    closeEdit();
}

function closeEdit() {
    editmode.style.display = "none";
}

function filterContacts() {
    const query = document.getElementById("search").value.toLowerCase();
    const contacts = loadContacts();

    const filteredContacts = contacts.filter(contact =>
        contact.nameValue.toLowerCase().includes(query)
    );

    displayContacts(filteredContacts);
}

displayContacts();
