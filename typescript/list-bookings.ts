interface BookingDataType {
    hotelNumber: number,
    guestNumber: number,
    bookingFrom: Date;
    bookingUpto: Date;
}

let currentModalBookingGuestID: number = -1;
let currentModalBookingHotelID: number = -1;
let currentBookingTableRow: HTMLTableRowElement;
const bookingTable = document.getElementById("booking-table") as HTMLTableElement;

const bookingModalBackground = document.getElementById('booking-modal-background') as HTMLDivElement;
const bookingModalCloseButton = document.getElementById('booking-modal-close-button') as HTMLButtonElement;
bookingModalCloseButton.addEventListener('click', hideBookingEditModal);

const bookingUpdateForm = document.getElementById("modal-booking-update-form") as HTMLFormElement;
const bookingUpdateFormSubmitButton = document.getElementById('booking-update-form-submit-button') as HTMLButtonElement;

const modalBookingDateFrom = document.getElementById('booking-date-from') as HTMLInputElement;
const modalBookingDateUpto = document.getElementById('booking-date-upto') as HTMLInputElement;


async function getAllBookings(): Promise<void> {
    const res = await fetch('http://localhost:5000/get-all-bookings');
    const bookingData: any[] = await res.json();
    for (const booking of bookingData) {
        const row = bookingTable.insertRow();
        row.dataset.hid = booking.Hno;
        row.dataset.gid = booking.Gno;
        row.dataset.date_from = booking.Date_from;
        row.dataset.date_upto = booking.Date_to;

        const bookingHotelNumberCell = row.insertCell();
        bookingHotelNumberCell.innerText = booking.Gno;
        bookingHotelNumberCell.style.textAlign = "center";


        const bookingGuestNumberCell = row.insertCell();
        bookingGuestNumberCell.innerText = booking.Gno;
        bookingGuestNumberCell.style.textAlign = "center";

        const bookingDateFromCell = row.insertCell();
        bookingDateFromCell.innerText = booking.Date_from;

        const bookingDateUptoCell = row.insertCell();
        bookingDateUptoCell.innerText = booking.Date_to;

        const EditDeleteBtnContainerRow = row.insertCell();
        const EditDeleteBtnContainer = document.createElement('div');
        EditDeleteBtnContainerRow.appendChild(EditDeleteBtnContainer);

        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.classList.add('edit-button-style');
        editBtn.addEventListener('click', editBooking);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList.add('delete-button-style');
        deleteBtn.addEventListener('click', deleteBooking);

        EditDeleteBtnContainer.appendChild(editBtn);
        EditDeleteBtnContainer.appendChild(deleteBtn);

        EditDeleteBtnContainer.style.display = "flex";
        EditDeleteBtnContainer.style.width = "100%";
        EditDeleteBtnContainer.style.justifyContent = "space-evenly";
    }
}

function displayBookingEditModal(): void {
    bookingModalBackground.classList.remove('hidden');
}

function hideBookingEditModal(): void {
    bookingModalBackground.classList.add('hidden');
}

async function deleteBooking(e: MouseEvent) {
    const bookingTableRow = (((e.currentTarget as HTMLButtonElement).parentNode as HTMLDivElement).parentNode as HTMLTableCellElement).parentNode as HTMLTableRowElement;
    const guestID = Number(bookingTableRow.dataset.gid);
    const hotelID = Number(bookingTableRow.dataset.hid);
    const res = await fetch(`/delete-booking/bookingDetails?guestID=${guestID}&hotelID=${hotelID}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        bookingTableRow.remove();
    } else {
        console.log('some error occurred while deleting');
    }
}

function populateBookingEditModal(hotelID: number, guestID: number, bookingTableRow: HTMLTableRowElement): void {
    currentModalBookingGuestID = guestID;
    currentModalBookingHotelID = hotelID;
    modalBookingDateFrom.value = bookingTableRow.dataset.date_from as string;
    modalBookingDateUpto.value = bookingTableRow.dataset.date_upto as string;
}

function editBooking(e: MouseEvent) {
    displayBookingEditModal();
    const bookingTableRow = (((e.currentTarget as HTMLButtonElement).parentNode as HTMLDivElement).parentNode as HTMLTableCellElement).parentNode as HTMLTableRowElement;
    currentBookingTableRow = bookingTableRow;
    const guestID = Number(bookingTableRow.dataset.gid);
    const hotelID = Number(bookingTableRow.dataset.hid);
    populateBookingEditModal(hotelID, guestID, bookingTableRow);
}

bookingUpdateForm.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();
    bookingUpdateFormSubmitButton.disabled = true;
    const formData = new FormData(bookingUpdateForm);
    if (!formData) {
        throw new Error("booking update form wasn't submitted successfully");
    }
    const bookingData = {
        hotelNumber: currentModalBookingHotelID,
        guestNumber: currentModalBookingGuestID,
        bookingFrom: new Date(formData.get('date_from') as string),
        bookingUpto: new Date(formData.get('date_upto') as string)

    };
    updateBooking(currentModalBookingGuestID, currentModalBookingHotelID, bookingData);
});

async function updateBooking(guestID: number, hotelID: number, bookingData: BookingDataType) {
    const res: Response = await fetch(`/update-booking/bookingDetails?guestID=${guestID}&hotelID=${hotelID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
    });
    if (!res.ok) {
        console.error(`could not update booking`);
    } else {

        const dateFromString = bookingData.bookingFrom.toISOString().toString().split('T')[0];
        const dateUptoString = bookingData.bookingUpto.toISOString().toString().split('T')[0];
        hideBookingEditModal();
        /* 2 represents booking from */
        currentBookingTableRow.dataset.date_from = dateFromString;
        currentBookingTableRow.children[2].innerHTML = dateFromString;
        /* 3 represents booking upto */
        currentBookingTableRow.dataset.date_upto = dateUptoString;
        currentBookingTableRow.children[3].innerHTML = dateUptoString;
    }
    bookingUpdateFormSubmitButton.disabled = false;
}

hideBookingEditModal();
getAllBookings();