interface GuestDataType {
    guestName: string,
    guestAddress: string,
    guestPhoneNumber: number;
}

let currentModalGuestID: number = -1;
let currentGuestTableRow: HTMLTableRowElement;
const guestTable = document.getElementById("guest-table") as HTMLTableElement;

const guestModalBackground = document.getElementById('guest-modal-background') as HTMLDivElement;
const guestModalCloseButton = document.getElementById('guest-modal-close-button') as HTMLButtonElement;
guestModalCloseButton.addEventListener('click', hideGuestEditModal);

const guestUpdateForm = document.getElementById("modal-guest-update-form") as HTMLFormElement;
const guestUpdateFormSubmitButton = document.getElementById('guest-update-form-submit-button') as HTMLButtonElement;

const modalGuestName = document.getElementById('guest-name') as HTMLInputElement;
const modalGuestAddress = document.getElementById('guest-address') as HTMLTextAreaElement;
const modalGuestPhoneNumber = document.getElementById('guest-phone-number') as HTMLInputElement;


async function getAllGuests(): Promise<void> {
    const res = await fetch('http://localhost:5000/get-all-guests');
    const guestData: any[] = await res.json();
    for (const guest of guestData) {
        const row = guestTable.insertRow();
        row.dataset.gid = guest.Gno;
        row.dataset.gname = guest.Gname;
        row.dataset.gaddress = guest.Address;
        row.dataset.gphonenumber = guest.Phone;

        const guestNumberCell = row.insertCell();
        guestNumberCell.innerText = guest.Gno;
        guestNumberCell.style.textAlign = "center";

        const guestNameCell = row.insertCell();
        guestNameCell.innerText = guest.Gname;

        const guestAddressCell = row.insertCell();
        guestAddressCell.innerText = guest.Address;

        const guestPhoneNumberCell = row.insertCell();
        guestPhoneNumberCell.innerText = guest.Phone;

        const EditDeleteBtnContainerRow = row.insertCell();
        const EditDeleteBtnContainer = document.createElement('div');
        EditDeleteBtnContainerRow.appendChild(EditDeleteBtnContainer);

        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.classList.add('edit-button-style');
        editBtn.addEventListener('click', editGuest);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList.add('delete-button-style');
        deleteBtn.addEventListener('click', deleteGuest);

        EditDeleteBtnContainer.appendChild(editBtn);
        EditDeleteBtnContainer.appendChild(deleteBtn);

        EditDeleteBtnContainer.style.display = "flex";
        EditDeleteBtnContainer.style.width = "100%";
        EditDeleteBtnContainer.style.justifyContent = "space-evenly";
    }
}

function displayGuestEditModal(): void {
    guestModalBackground.classList.remove('hidden');
}

function hideGuestEditModal(): void {
    guestModalBackground.classList.add('hidden');
}

async function deleteGuest(e: MouseEvent) {
    const tableRow = (((e.currentTarget as HTMLButtonElement).parentNode as HTMLDivElement).parentNode as HTMLTableCellElement).parentNode as HTMLTableRowElement;
    const guestID = Number(tableRow.dataset.gid);
    const res = await fetch(`http://localhost:5000/delete-guest/${guestID}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        tableRow.remove();
    } else {
        console.log('some error occurred while deleting');
    }
}

function populateGuestEditModal(guestID: number, guestTableRow: HTMLTableRowElement): void {
    currentModalGuestID = guestID;
    modalGuestName.value = guestTableRow.dataset.gname as string;
    modalGuestAddress.value = guestTableRow.dataset.gaddress as string;
    modalGuestPhoneNumber.valueAsNumber = Number(guestTableRow.dataset.gphonenumber);
}

function editGuest(e: MouseEvent) {
    displayGuestEditModal();
    const guestTableRow = (((e.currentTarget as HTMLButtonElement).parentNode as HTMLDivElement).parentNode as HTMLTableCellElement).parentNode as HTMLTableRowElement;
    currentGuestTableRow = guestTableRow;
    const guestID = Number(guestTableRow.dataset.gid);
    populateGuestEditModal(guestID, guestTableRow);
}

guestUpdateForm.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();
    guestUpdateFormSubmitButton.disabled = true;
    const formData = new FormData(guestUpdateForm);
    if (!formData) {
        throw new Error("hotel input form wasn't submitted successfully");
    }
    const guestData: GuestDataType = {
        guestName: (formData.get('guest_name') as string).trim(),
        guestAddress: (formData.get('guest_address') as string).trim(),
        guestPhoneNumber: Number(formData.get('guest_phone_number') as string),
    };
    updateGuest(currentModalGuestID, guestData);
});

async function updateGuest(guestID: number, guestData: GuestDataType) {
    console.log(guestData);
    const res: Response = await fetch(`http://localhost:5000/update-guest/${guestID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(guestData)
    });
    if (!res.ok) {
        console.error(`could not update guest with guestID ${guestID}`);
    } else {
        hideGuestEditModal();
        /* 1 represents hotel name */
        currentGuestTableRow.dataset.gname = guestData.guestName;
        currentGuestTableRow.children[1].innerHTML = guestData.guestName;
        /* 2 represents hotel city */
        currentGuestTableRow.dataset.gaddress = guestData.guestAddress;
        currentGuestTableRow.children[2].innerHTML = guestData.guestAddress;
        /* 3 represents hotel phone */
        currentGuestTableRow.dataset.gphonenumber = `${guestData.guestPhoneNumber}`;
        currentGuestTableRow.children[3].innerHTML = `${guestData.guestPhoneNumber}`;
    }
    guestUpdateFormSubmitButton.disabled = false;
}

hideGuestEditModal();
getAllGuests();