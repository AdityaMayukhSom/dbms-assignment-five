import { BookingDataType, db } from "./middleware";

export function addNewBooking(bookingData: BookingDataType) {
    if (bookingData.bookingUpto <= bookingData.bookingFrom && bookingData.bookingFrom < new Date()) {
        throw new Error('wrong booking dates')
    } else {
        const dateFromString = bookingData.bookingFrom.toString().split('T')[0];
        const dateToString = bookingData.bookingUpto.toString().split('T')[0];
        db.run(`insert into Booking(Hno, Gno, Date_from, Date_to) values (${bookingData.hotelNumber}, ${bookingData.guestNumber}, "${dateFromString}", "${dateToString}")`, (err: Error) => {
            if (err) {
                console.error(err.message)
                throw err;
            }
        })
    }
}