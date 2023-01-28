import { db } from "./middleware";

export function createHotelTable(): void {
    db.run(`
		CREATE TABLE IF NOT EXISTS Hotel( 
			Hno integer primary key, 
			Hname text, 
			City text, 
			Phone integer, 
			Room_type text, 
			Price integer 
		);
  	`, function (err: Error) {
        if (err) {
            console.log(err.message)
        }
    })
}

export function createGuestTable(): void {
    db.run(`
		CREATE TABLE IF NOT EXISTS Guest(
			Gno integer primary key,
			Gname text,
			Address text,
			Phone integer
		);
	`, (err: Error) => {
        if (err) {
            console.log(err.message);
        }
    })
}

export function createBookingTable(): void {
    db.run(`
		CREATE TABLE IF NOT EXISTS Booking(
			Hno integer, 
			Gno integer,
			Date_from date,
			Date_to date,

			foreign key (Hno) references Hotel(Hno),
			foreign key (Gno) references Guest(Gno)
		);
	`, (err: Error) => {
        if (err) {
            console.log(err.message)
        }
    })
}
