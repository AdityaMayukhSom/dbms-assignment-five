
interface HotelDataType {
    hotelName: string,
    hotelCity: string,
    hotelRoomType: string,
    hotelPhoneNumber: number,
    hotelPrice: number;
}

const hotelInputForm = document.querySelector("#hotel-input-form") as HTMLFormElement;
if (!hotelInputForm) {
    throw new Error("hotel input form not found");
}
const hotelInputFormSubmitButton = document.getElementById('hotel-input-form-submit-button') as HTMLButtonElement;

hotelInputForm.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();
    hotelInputFormSubmitButton.disabled = true;
    const formData = new FormData(hotelInputForm);
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
    createHotel(hotelData);
});


async function createHotel(hotelData: HotelDataType) {
    const res: Response = await fetch('http://localhost:5000/hotelinput', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hotelData)
    });


    if (!res.ok) {
        console.error('could not create hotel');
        hotelInputFormSubmitButton.disabled = false;
    } else {
        // location.reload();
        location.assign(res.url);
    }
}
