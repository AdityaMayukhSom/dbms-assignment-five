import { db, HotelDataType, toTitleCase, validatePhoneNumber } from "./middleware";

export function addNewHotel(hotelData: HotelDataType) {
    const { hotelName, hotelCity, hotelRoomType, hotelPhoneNumber, hotelPrice } = hotelData;
    if (!validatePhoneNumber(hotelPhoneNumber.toString())) {
        console.log('hotel phone number invalid : handleHotel.ts')
        throw new Error('invalid hotel mobile number given')
    }
    db.run(`
    	insert into Hotel (Hname, City, Phone, Room_type, Price)
    	values ("${toTitleCase(hotelName)}", "${toTitleCase(hotelCity)}", ${hotelPhoneNumber}, "${hotelRoomType}", ${hotelPrice});
    `, (err: Error) => {
        if (err) {
            throw err;
        }
    })
}

export function getAllHotels() {
    db.all('select * from Hotel;', [], (err: Error, rows: any[]) => {
        if (err) {
            throw err;
        }

        return rows;
    })
} 