interface HotelDataType {
    hotelName: string,
    hotelCity: string,
    hotelRoomType: string,
    hotelPhoneNumber: number,
    hotelPrice: number;
}

function convertIntoCurrencyString(price: number): string {
    return price.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR'
    });
}

let currentModalHotelID: number = -1;
let currentHotelTableRow: HTMLTableRowElement;
const table = document.querySelector("table") as HTMLTableElement;

const hotelModalBackground = document.getElementById('hotel-modal-background') as HTMLDivElement;
const hotelModalCloseButton = document.getElementById('hotel-modal-close-button') as HTMLButtonElement;
hotelModalCloseButton.addEventListener('click', hideModal);

const hotelUpdateForm = document.getElementById("modal-hotel-update-form") as HTMLFormElement;
const hotelUpdateFormSubmitButton = document.getElementById('hotel-update-form-submit-button') as HTMLButtonElement;

const modalHotelName = document.getElementById('hotel-name') as HTMLInputElement;
const modalHotelCity = document.getElementById('hotel-city') as HTMLInputElement;
const modalHotelPhoneNumber = document.getElementById('hotel-phone-number') as HTMLInputElement;
const modalHotelRoomType = document.getElementById('hotel-room-type') as HTMLInputElement;
const modalHotelPrice = document.getElementById('hotel-price') as HTMLInputElement;

async function getAllHotels(): Promise<void> {
    const res = await fetch('http://localhost:5000/get-all-hotels');
    const hotelData: any[] = await res.json();
    for (const hotel of hotelData) {
        const row = table.insertRow();
        row.dataset.hid = hotel.Hno;
        row.dataset.hname = hotel.Hname;
        row.dataset.hcity = hotel.City;
        row.dataset.hphone = hotel.Phone;
        row.dataset.hprice = hotel.Price;
        row.dataset.hroomtype = hotel.Room_type;

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
        PriceCell.innerText = convertIntoCurrencyString(hotel.Price);
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

async function deleteHotel(e: MouseEvent) {
    const tableRow = (((e.currentTarget as HTMLButtonElement).parentNode as HTMLDivElement).parentNode as HTMLTableCellElement).parentNode as HTMLTableRowElement;
    const hotelID = Number(tableRow.dataset.hid);
    const res = await fetch(`http://localhost:5000/delete-hotel/${hotelID}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        tableRow.remove();
    } else {
        console.log('some error occurred while deleting');
    }
}

function populateModal(hotelID: number, tableRow: HTMLTableRowElement): void {
    currentModalHotelID = hotelID;
    modalHotelName.value = tableRow.dataset.hname as string;
    modalHotelCity.value = tableRow.dataset.hcity as string;
    modalHotelPhoneNumber.valueAsNumber = Number(tableRow.dataset.hphone);
    modalHotelPrice.valueAsNumber = Number(tableRow.dataset.hprice);
    modalHotelRoomType.value = tableRow.dataset.hroomtype as string;
}

function editHotel(e: MouseEvent) {
    displayModal();
    const tableRow = (((e.currentTarget as HTMLButtonElement).parentNode as HTMLDivElement).parentNode as HTMLTableCellElement).parentNode as HTMLTableRowElement;
    currentHotelTableRow = tableRow;
    const hotelID = Number(tableRow.dataset.hid);
    populateModal(hotelID, tableRow);
}

hotelUpdateForm.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();
    hotelUpdateFormSubmitButton.disabled = true;
    const formData = new FormData(hotelUpdateForm);
    if (!formData) {
        throw new Error("hotel input form wasn't submitted successfully");
    }
    const hotelData: HotelDataType = {
        hotelName: (formData.get('hotel_name') as string).trim(),
        hotelCity: (formData.get('hotel_city') as string).trim(),
        hotelRoomType: (formData.get('hotel_room_type') as string).trim(),
        hotelPhoneNumber: Number(formData.get('hotel_phone_number') as string),
        hotelPrice: Number(formData.get('hotel_price') as string)
    };
    updateHotel(currentModalHotelID, hotelData);
});


async function updateHotel(hotelID: number, hotelData: HotelDataType) {
    const res: Response = await fetch(`http://localhost:5000/update-hotel/${hotelID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hotelData)
    });
    if (!res.ok) {
        console.error(`could not update hotel with hotelID ${hotelID}`);
    } else {
        hideModal();
        /* 1 represents hotel name */
        currentHotelTableRow.dataset.hname = hotelData.hotelName;
        currentHotelTableRow.children[1].innerHTML = hotelData.hotelName;
        /* 2 represents hotel city */
        currentHotelTableRow.dataset.hcity = hotelData.hotelCity;
        currentHotelTableRow.children[2].innerHTML = hotelData.hotelCity;
        /* 3 represents hotel phone */
        currentHotelTableRow.dataset.hphone = `${hotelData.hotelPhoneNumber}`;
        currentHotelTableRow.children[3].innerHTML = `${hotelData.hotelPhoneNumber}`;
        /* 4 represents hotel room type */
        currentHotelTableRow.dataset.hroomtype = hotelData.hotelRoomType;
        currentHotelTableRow.children[4].innerHTML = hotelData.hotelRoomType;
        /* 5 represents hotel price */
        currentHotelTableRow.dataset.hprice = `${hotelData.hotelPrice}`;
        currentHotelTableRow.children[5].innerHTML = `${convertIntoCurrencyString(hotelData.hotelPrice)}`;
    }
    hotelUpdateFormSubmitButton.disabled = false;
}

hideModal();
getAllHotels();
