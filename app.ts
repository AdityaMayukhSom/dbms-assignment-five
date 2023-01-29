import bp from 'body-parser';
import express, { Request, Response, Application } from 'express';
import { GuestDataType, HotelDataType } from './src/middleware';
import { addNewGuest } from './src/handleGuests';
import { addNewHotel, deleteHotel, getAllHotels, updateHotel } from './src/handleHotels';
import { addNewBooking } from './src/handleBookings';

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

/* routes for hotels */
app.get('/hotel-input-form', (req: Request, res: Response) => {
	res.sendFile(__dirname + '/public/input-form-hotel.html');
});

app.post('/hotelinput', async (req: Request, res: Response) => {
	const hotelData: HotelDataType = req.body;
	if (!hotelData) {
		return res.status(400).send({ status: 'failed to recieve hotel data' });
	}

	try {
		await addNewHotel(hotelData);
		return res.status(301).location('/current-hotels').send('hotel data is recieved and succesfully added to the database');

	} catch (err) {
		return res.status(500).send('hotel data recieved but server was unable to update the database');
	}
});

/* routes for guests */
app.get('/guest-input-form', (req: Request, res: Response) => {
	res.status(200).sendFile(__dirname + '/public/input-form-guest.html');
});

app.post('/guestinput', (req: Request, res: Response) => {
	const guestData: GuestDataType = req.body;
	if (!guestData) {
		return res.status(400).send({ status: 'failed to recieve guest data' });
	}
	try {
		addNewGuest(guestData);
		return res.status(200).send({ status: 'guest data recieved' });
	} catch (err) {
		return res.status(500).send({ status: 'guest data recieved but server was unable to update the database' });
	}
});

/* routes for bookings */
app.get('/booking-input-form', (req: Request, res: Response) => {
	res.status(200).sendFile(__dirname + '/public/input-form-booking.html');
});

app.post('/bookinginput', (req: Request, res: Response) => {
	const bookingData = req.body;
	if (!bookingData) {
		res.status(400).send({ status: 'failed to get boooking information' });
	}
	addNewBooking(bookingData);
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

app.get('/get-all-hotels', async (req: Request, res: Response) => {
	try {
		const hotelDetails = await getAllHotels();
		res.status(200).send(hotelDetails);
	} catch (err) {
		res.status(500).send({ status: 'server was not able to fetch all hotel details' });
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

app.put('/update-hotel/:hotelID', async (req: Request, res: Response) => {
	const hotelID: number = Number(req.params.hotelID);
	const latestHotelData: HotelDataType = req.body;
	if (!latestHotelData) {
		res.status(400).send({ status: `data to be updated was not sent to server properly` });
	}

	console.log(latestHotelData);
	try {
		await updateHotel(hotelID, latestHotelData);
		res.status(200).send({ status: `data of hotel with hotelID ${hotelID} updated succesfully` });
	} catch (err) {
		res.status(500).send({ status: `server was unable to update hotel with hotelID ${hotelID}` });
	}
});


app.get('*', (req: Request, res: Response) => {
	res.sendFile(__dirname + '/public/page-not-found.html');
});

app.listen(port);
