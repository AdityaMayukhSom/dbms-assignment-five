import bp from 'body-parser';
import express, { Request, Response, Application } from 'express';
import { GuestDataType, HotelDataType, BookingDataType } from './src/middleware';
import { addNewGuest, deleteGuest, getAllGuests, updateGuest } from './src/handleGuests';
import { addNewHotel, deleteHotel, getAllHotels, updateHotel } from './src/handleHotels';
import { addNewBooking, deleteBooking, getAllBookings, updateBooking } from './src/handleBookings';

const app: Application = express();
const port: number = 5000;
const baseURL: string = 'http://localhost:' + port;

// Because we are using Express@4 we need to install the body - parser package:
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use('/assets', express.static(__dirname + '/public/assets'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/scripts', express.static(__dirname + '/public/scripts'));

app.get('/', (req: Request, res: Response) => {
	res.sendFile(__dirname + '/public/homepage.html');
});

app.get('/hotel-input-form', (req: Request, res: Response) => {
	res.sendFile(__dirname + '/public/input-form-hotel.html');
});

app.get('/guest-input-form', (req: Request, res: Response) => {
	res.status(200).sendFile(__dirname + '/public/input-form-guest.html');
});

app.get('/booking-input-form', (req: Request, res: Response) => {
	res.status(200).sendFile(__dirname + '/public/input-form-booking.html');
});

app.get('/current-hotels', (req: Request, res: Response) => {
	res.status(200).sendFile(__dirname + '/public/list-hotels.html');
});

app.get('/current-guests', (req: Request, res: Response) => {
	res.status(200).sendFile(__dirname + '/public/list-guests.html');
});

app.get('/current-bookings', (req: Request, res: Response) => {
	res.status(200).sendFile(__dirname + '/public/list-bookings.html');
});

app.post('/create-hotel', async (req: Request, res: Response) => {
	const hotelData: HotelDataType = req.body;
	try {
		await addNewHotel(hotelData);
		return res.status(301).location('/current-hotels').send('hotel data recieved and succesfully added to the database');
	} catch (err) {
		return res.status(500).send('hotel data recieved but server was unable to update the database');
	}
});

app.post('/create-guest', async (req: Request, res: Response) => {
	const guestData: GuestDataType = req.body;
	try {
		await addNewGuest(guestData);
		return res.status(301).location('/current-guests').send('guest data recieved and succesfully added to the database');
	} catch (err) {
		return res.status(500).send('guest data recieved but server was unable to update the database');
	}
});

app.post('/create-booking', async (req: Request, res: Response) => {
	const bookingData: BookingDataType = req.body;
	console.log(bookingData);
	try {
		await addNewBooking(bookingData);
		return res.status(301).location('/current-bookings').send('bookings data recieved and succesfully added to the database');
	} catch (err) {
		return res.status(500).send('hotel data recieved but server was unable to update the database');
	}
});

app.get('/get-all-hotels', async (req: Request, res: Response) => {
	try {
		const hotelDetails = await getAllHotels();
		res.status(200).send(hotelDetails);
	} catch (err) {
		res.status(500).send({ status: 'server was not able to fetch all hotel details' });
	}
});

app.get('/get-all-guests', async (req: Request, res: Response) => {
	try {
		const guestDetails = await getAllGuests();
		return res.status(200).send(guestDetails);
	} catch (err) {
		return res.status(500).send({ status: 'server was not able to fetch all guest details' });
	}
});

app.get('/get-all-bookings', async (req: Request, res: Response) => {
	try {
		const guestDetails = await getAllBookings();
		return res.status(200).send(guestDetails);
	} catch (err) {
		return res.status(500).send({ status: 'server was not able to fetch all guest details' });
	}
});

app.delete('/delete-hotel/:hotelID', async (req: Request, res: Response) => {
	const hotelID = Number(req.params.hotelID);
	try {
		await deleteHotel(hotelID);
		res.status(200).send({ status: `hotel with hotelID ${hotelID} deleted` });
	} catch (err) {
		res.status(500).send({ status: `server was unable to delete hotel with hotelID ${hotelID}` });
	}
});

app.delete('/delete-guest/:guestID', async (req: Request, res: Response) => {
	const guestID = Number(req.params.guestID);
	try {
		await deleteGuest(guestID);
		res.status(200).send({ status: `guest with guestID ${guestID} deleted` });
	} catch (err) {
		res.status(500).send({ status: `server was unable to delete guest with guestID ${guestID}` });
	}
});

app.delete('/delete-booking/bookingDetails', async (req: Request, res: Response) => {
	const guestID = Number(req.query.guestID);
	const hotelID = Number(req.query.hotelID);
	try {
		await deleteBooking(guestID, hotelID);
		res.status(200).send({ status: `booking with guestID ${guestID} and hotelID ${hotelID} deleted` });
	} catch (err) {
		res.status(500).send({ status: `server was unable to delete booking with guestID ${guestID} and hotelID ${hotelID}` });
	}
});

app.put('/update-hotel/:hotelID', async (req: Request, res: Response) => {
	const hotelID: number = Number(req.params.hotelID);
	const latestHotelData: HotelDataType = req.body;
	try {
		await updateHotel(hotelID, latestHotelData);
		res.status(200).send({ status: `data of hotel with hotelID ${hotelID} updated succesfully` });
	} catch (err) {
		res.status(500).send({ status: `server was unable to update hotel with hotelID ${hotelID}` });
	}
});
app.put('/update-guest/:guestID', async (req: Request, res: Response) => {
	const guestID: number = Number(req.params.guestID);
	const latestGuestData: GuestDataType = req.body;
	try {
		await updateGuest(guestID, latestGuestData);
		res.status(200).send({ status: `data of guest with guestID ${guestID} updated succesfully` });
	} catch (err) {
		res.status(500).send({ status: `server was unable to update guest with guestID ${guestID}` });
	}
});

app.put('/update-booking/bookingDetails', async (req: Request, res: Response) => {
	const guestID = Number(req.query.guestID);
	const hotelID = Number(req.query.hotelID);
	const bookingData = req.body;
	console.log(req.query);
	console.log(bookingData);
	try {
		await updateBooking(guestID, hotelID, bookingData);
		res.status(200).send({ status: `booking with guestID ${guestID} and hotelID ${hotelID} updated` });
	} catch (err) {
		res.status(500).send({ status: `server was unable to delete booking with guestID ${guestID} and hotelID ${hotelID}` });
	}
});

app.get('*', (req: Request, res: Response) => {
	res.sendFile(__dirname + '/public/page-not-found.html');
});

app.listen(port);
