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

export async function getAllBookings(): Promise<any[]> {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM Booking', (err: Error, rows: any[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

export async function deleteBooking(guestID: number, hotelID: number): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`delete from Booking where Hno = (?) and Gno = (?)`, [hotelID, guestID], (err: Error) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export async function updateBooking(guestID: number, hotelID: number, bookingData: BookingDataType): Promise<void> {
    const dateFromString = bookingData.bookingFrom.toString().split('T')[0];
    const dateUptoString = bookingData.bookingUpto.toString().split('T')[0];
    return new Promise((resolve, reject) => {
        db.run(`update Booking
        set Date_from = "${dateFromString}", Date_to = "${dateUptoString}" where Hno = ${hotelID} and Gno = ${guestID}`, (err: Error) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}