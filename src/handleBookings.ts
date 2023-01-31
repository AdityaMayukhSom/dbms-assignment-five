import { BookingDataType, db } from "./middleware";

export async function addNewBooking(bookingData: BookingDataType): Promise<void> {
    return new Promise((resolve, reject) => {
        if (bookingData.bookingUpto <= bookingData.bookingFrom && bookingData.bookingFrom < new Date()) {
            // throw new Error('wrong booking dates');
            reject('booking dates are incorrect');
        } else {
            const dateFromString = bookingData.bookingFrom.toString().split('T')[0];
            const dateToString = bookingData.bookingUpto.toString().split('T')[0];
            db.run(`insert into Booking(Hno, Gno, Date_from, Date_to) values (${bookingData.hotelNumber}, ${bookingData.guestNumber}, "${dateFromString}", "${dateToString}")`, (err: Error) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        }
    });
}