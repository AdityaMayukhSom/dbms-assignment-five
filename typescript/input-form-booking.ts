interface BookingDataType {
    hotelNumber: number,
    guestNumber: number,
    bookingFrom: Date;
    bookingUpto: Date;
}

const bookingInputForm = document.getElementById("booking-input-form") as HTMLFormElement;

bookingInputForm.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();
    const bookingFormData = new FormData(bookingInputForm);

    const bookingFrom = new Date(bookingFormData.get('date_from') as string);
    const bookingUpto = new Date(bookingFormData.get('date_upto') as string);
    const hotelNo = Number(bookingFormData.get('hno'));
    const guestNo = Number(bookingFormData.get('gno'));
    if (!bookingFrom || !bookingUpto || !hotelNo || !guestNo) {
        alert('please submit all requred informations');
        return;
    }
    if (bookingUpto <= bookingFrom && bookingFrom < new Date()) {
        alert('Please Enter Correct Booking Dates. Form Not Submitted.');
        return;
    }
    const bookingData = {
        hotelNumber: hotelNo,
        guestNumber: guestNo,
        bookingFrom: bookingFrom,
        bookingUpto: bookingUpto
    };
    createBooking(bookingData);
});

async function createBooking(bookingData: BookingDataType) {
    const res: Response = await fetch('http://localhost:5000/create-booking', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
    });
    if (!res.ok) {
        console.error('could not create booking');
    } else {
        location.assign(res.url);
    }
}