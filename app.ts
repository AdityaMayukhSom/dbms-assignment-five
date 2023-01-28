import bp from 'body-parser';
import express, { Request, Response, Application } from 'express';
import { GuestDataType, HotelDataType } from './src/middleware';
import { addNewGuest } from './src/handleGuests';
import { addNewHotel, getAllHotels } from './src/handleHotels';
import { addNewBooking } from './src/handleBookings';

const app: Application = express();
const port: number = 5000;

// Because we are using Express@4 we need to install the body - parser package:
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use('/static', express.static(__dirname + '/public'))

app.get('/', (req: Request, res: Response) => {
	res.sendFile(__dirname + '/src/homepage.html')
});

/* routes for hotels */
app.get('/hotel-input-form', (req: Request, res: Response) => {
	res.sendFile(__dirname + '/src/input-form-hotel.html')
});

app.post('/hotelinput', (req: Request, res: Response) => {
	const hotelData: HotelDataType = req.body;
	if (!hotelData) {
		return res.status(400).send({ status: 'failed to recieve hotel data' })
	}

	try {
		addNewHotel(hotelData);
		return res.status(200).send({ status: 'hotel data recieved and succesfully updated to database' })
	} catch (err) {
		return res.status(500).send({ errorMsg: 'hotel data recieved but server was unable to update the database', errorObj: err })
	}
})

app.put('/hotelinput', (req: Request, res: Response) => {

})

app.delete('/hotelinput', (req: Request, res: Response) => {

})

/* routes for guests */
app.get('/guest-input-form', (req: Request, res: Response) => {
	res.sendFile(__dirname + '/src/input-form-guest.html')
});

app.post('/guestinput', (req: Request, res: Response) => {
	const guestData: GuestDataType = req.body;
	if (!guestData) {
		return res.status(400).send({ status: 'failed to recieve guest data' })
	}
	try {
		addNewGuest(guestData)
		return res.status(200).send({ status: 'guest data recieved' })
	} catch (err) {
		return res.status(500).send({ status: 'guest data recieved but server was unable to update the database' })
	}
})

app.put('/guestinput', (req: Request, res: Response) => {

})

app.delete('/guestinput', (req: Request, res: Response) => {

})

/* routes for bookings */
app.get('/booking-input-form', (req: Request, res: Response) => {
	res.sendFile(__dirname + '/src/input-form-booking.html')
});

app.post('/bookinginput', (req: Request, res: Response) => {
	const bookingData = req.body;
	if (!bookingData) {
		res.status(400).send({ status: 'failed to get boooking information' })
	}

	addNewBooking(bookingData);
})

app.put('/bookinginput', (req: Request, res: Response) => {

})

app.delete('/bookinginput', (req: Request, res: Response) => {
})

app.get('/current-hotels', (req: Request, res: Response) => {
	res.status(200).sendFile(__dirname + '/src/list-hotels.html')
})

app.get('/current-guests', (req: Request, res: Response) => {
	res.status(200).sendFile(__dirname + '/src/list-guests.html')
})

app.get('/current-bookings', (req: Request, res: Response) => {
	res.status(200).sendFile(__dirname + '/src/list-bookings.html')
})

app.get('/get-all-hotels', (req: Request, res: Response) => {
	getAllHotels();
})


app.get('*', (req: Request, res: Response) => {
	res.sendFile(__dirname + '/src/page-not-found.html')
});

app.listen(port);
