import { db, HotelDataType, toTitleCase, validatePhoneNumber } from "./middleware";

export async function addNewHotel(hotelData: HotelDataType): Promise<void> {
    return new Promise((resolve, reject) => {
        const { hotelName, hotelCity, hotelRoomType, hotelPhoneNumber, hotelPrice } = hotelData;
        if (!validatePhoneNumber(hotelPhoneNumber.toString())) {
            console.log('hotel phone number invalid : handleHotel.ts');
            throw new Error('invalid hotel mobile number given');
        }
        db.run(`
    	insert into Hotel (Hname, City, Phone, Room_type, Price)
    	values ("${toTitleCase(hotelName)}", "${toTitleCase(hotelCity)}", ${hotelPhoneNumber}, "${hotelRoomType}", ${hotelPrice});
    `, (err: Error) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });

}

export async function getAllHotels(): Promise<any[]> {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM Hotel', (err: Error, rows: any[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

export async function deleteHotel(hotelNo: number): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`delete from Hotel where Hno = (?)`, hotelNo, (err: Error) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}