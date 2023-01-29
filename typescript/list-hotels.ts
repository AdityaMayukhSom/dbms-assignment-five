const table = document.querySelector("table") as HTMLTableElement;
const hotelModalBackground = document.getElementById('hotel-modal-background') as HTMLDivElement;
const hotelModalCloseButton = document.getElementById('hotel-modal-close-button') as HTMLButtonElement;

async function getAllHotels(): Promise<void> {
    const res = await fetch('http://localhost:5000/get-all-hotels');
    const hotelData: any[] = await res.json();
    for (const hotel of hotelData) {
        const row = table.insertRow();
        row.dataset.hid = hotel.Hno;

        const HnoCell = row.insertCell();
        HnoCell.innerText = hotel.Hno;
        HnoCell.style.textAlign = "center";

        const HnameCell = row.insertCell();
        HnameCell.innerText = hotel.Hname;

        const CityCell = row.insertCell();
        CityCell.innerText = hotel.City;

        const PhoneCell = row.insertCell();
        PhoneCell.innerText = hotel.Phone;

        const Room_typeCell = row.insertCell();
        Room_typeCell.innerText = hotel.Room_type;

        const PriceCell = row.insertCell();
        const priceInINR = (hotel.Price).toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR'
        });
        PriceCell.innerText = priceInINR;
        PriceCell.style.textAlign = "right";
        PriceCell.style.padding = "12px";

        const EditDeleteBtnContainerRow = row.insertCell();
        const EditDeleteBtnContainer = document.createElement('div');
        EditDeleteBtnContainerRow.appendChild(EditDeleteBtnContainer);


        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.classList.add('edit-button-style');
        editBtn.addEventListener('click', editHotel);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList.add('delete-button-style');
        deleteBtn.addEventListener('click', deleteHotel);


        EditDeleteBtnContainer.appendChild(editBtn);
        EditDeleteBtnContainer.appendChild(deleteBtn);

        EditDeleteBtnContainer.style.display = "flex";
        EditDeleteBtnContainer.style.width = "100%";
        EditDeleteBtnContainer.style.justifyContent = "space-evenly";
    }
}

function displayModal(): void {
    hotelModalBackground.classList.remove('hidden');
}
function hideModal(): void {
    hotelModalBackground.classList.add('hidden');
}

async function editHotel(e: MouseEvent) {
    displayModal();
    const tableRow = (((e.currentTarget as HTMLButtonElement).parentNode as HTMLDivElement).parentNode as HTMLTableCellElement).parentNode as HTMLTableRowElement;

    const hotelID = Number(tableRow.dataset.hid);

}

async function deleteHotel(e: MouseEvent) {
    const tableRow = (((e.currentTarget as HTMLButtonElement).parentNode as HTMLDivElement).parentNode as HTMLTableCellElement).parentNode as HTMLTableRowElement;
    const hotelID = Number(tableRow.dataset.hid);
    const res = await fetch(`http://localhost:5000/delete-hotel/${hotelID}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        tableRow.remove();
    } else {
        console.log('some error occurred');
    }
}

hideModal();
getAllHotels();
hotelModalCloseButton.addEventListener('click', hideModal);