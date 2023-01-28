import sqlite3 from 'sqlite3';
import { createBookingTable, createGuestTable, createHotelTable } from './instantiateDatabase';

/**
 * Hotel Data Input
 * 
 * Contains hotelID (optional), hotelName, hotelCity, hotelPhoneNumber, hotelRoomType, hotelPrice
 */

export interface HotelDataType {
	hotelID?: number,
	hotelName: string,
	hotelCity: string,
	hotelRoomType: string,
	hotelPhoneNumber: number,
	hotelPrice: number
}

/**
 * Guest Data Input
 * 
 * Contains guestID (optional), guestName, guestAddress, guestPhoneNumber
 */
export interface GuestDataType {
	guestID?: number,
	guestName: string,
	guestAddress: string,
	guestPhoneNumber: number
}

/**
 * Booking Data Input
 * 
 * Contains hotelNumber, guestNumber, bookingFrom, bookingUpto
 */

export interface BookingDataType {
	hotelNumber: number,
	guestNumber: number,
	bookingFrom: Date;
	bookingUpto: Date
}


export const db = new sqlite3.Database(__dirname.slice(0, -4) + '/hotel_management.sqlite', (err: Error | null) => {
	if (err) {
		return console.error(err.message);
	} else {
		createGuestTable();
		createHotelTable();
		createBookingTable();
	}
});

export function toTitleCase(str: string): string {
	let sentence: string[] = str.toLowerCase().split(" ");
	for (let i = 0; i < sentence.length; i++) {
		sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1).toLowerCase();
	}
	const result: string = sentence.join(" ");
	return result;
}

export function validatePhoneNumber(mobileNumberString: string) {
	const mobileNumberRegex = /^\d{10}$/;
	return mobileNumberRegex.test(mobileNumberString);
}
