var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var currentModalBookingGuestID = -1;
var currentModalBookingHotelID = -1;
var currentBookingTableRow;
var bookingTable = document.getElementById("booking-table");
var bookingModalBackground = document.getElementById('booking-modal-background');
var bookingModalCloseButton = document.getElementById('booking-modal-close-button');
bookingModalCloseButton.addEventListener('click', hideBookingEditModal);
var bookingUpdateForm = document.getElementById("modal-booking-update-form");
var bookingUpdateFormSubmitButton = document.getElementById('booking-update-form-submit-button');
var modalBookingDateFrom = document.getElementById('booking-date-from');
var modalBookingDateUpto = document.getElementById('booking-date-upto');
function getAllBookings() {
    return __awaiter(this, void 0, void 0, function () {
        var res, bookingData, _i, bookingData_1, booking, row, bookingHotelNumberCell, bookingGuestNumberCell, bookingDateFromCell, bookingDateUptoCell, EditDeleteBtnContainerRow, EditDeleteBtnContainer, editBtn, deleteBtn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:5000/get-all-bookings')];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    bookingData = _a.sent();
                    for (_i = 0, bookingData_1 = bookingData; _i < bookingData_1.length; _i++) {
                        booking = bookingData_1[_i];
                        row = bookingTable.insertRow();
                        row.dataset.hid = booking.Hno;
                        row.dataset.gid = booking.Gno;
                        row.dataset.date_from = booking.Date_from;
                        row.dataset.date_upto = booking.Date_to;
                        bookingHotelNumberCell = row.insertCell();
                        bookingHotelNumberCell.innerText = booking.Gno;
                        bookingHotelNumberCell.style.textAlign = "center";
                        bookingGuestNumberCell = row.insertCell();
                        bookingGuestNumberCell.innerText = booking.Gno;
                        bookingGuestNumberCell.style.textAlign = "center";
                        bookingDateFromCell = row.insertCell();
                        bookingDateFromCell.innerText = booking.Date_from;
                        bookingDateUptoCell = row.insertCell();
                        bookingDateUptoCell.innerText = booking.Date_to;
                        EditDeleteBtnContainerRow = row.insertCell();
                        EditDeleteBtnContainer = document.createElement('div');
                        EditDeleteBtnContainerRow.appendChild(EditDeleteBtnContainer);
                        editBtn = document.createElement('button');
                        editBtn.innerText = 'Edit';
                        editBtn.classList.add('edit-button-style');
                        editBtn.addEventListener('click', editBooking);
                        deleteBtn = document.createElement('button');
                        deleteBtn.innerText = 'Delete';
                        deleteBtn.classList.add('delete-button-style');
                        deleteBtn.addEventListener('click', deleteBooking);
                        EditDeleteBtnContainer.appendChild(editBtn);
                        EditDeleteBtnContainer.appendChild(deleteBtn);
                        EditDeleteBtnContainer.style.display = "flex";
                        EditDeleteBtnContainer.style.width = "100%";
                        EditDeleteBtnContainer.style.justifyContent = "space-evenly";
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function displayBookingEditModal() {
    bookingModalBackground.classList.remove('hidden');
}
function hideBookingEditModal() {
    bookingModalBackground.classList.add('hidden');
}
function deleteBooking(e) {
    return __awaiter(this, void 0, void 0, function () {
        var tableRow, bookingID, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tableRow = e.currentTarget.parentNode.parentNode.parentNode;
                    bookingID = Number(tableRow.dataset.gid);
                    return [4 /*yield*/, fetch("http://localhost:5000/delete-booking/".concat(bookingID), {
                            method: 'DELETE'
                        })];
                case 1:
                    res = _a.sent();
                    if (res.ok) {
                        tableRow.remove();
                    }
                    else {
                        console.log('some error occurred while deleting');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function populateBookingEditModal(hotelID, guestID, bookingTableRow) {
    currentModalBookingGuestID = guestID;
    currentModalBookingHotelID = hotelID;
    modalBookingDateFrom.value = bookingTableRow.dataset.date_from;
    modalBookingDateUpto.value = bookingTableRow.dataset.date_upto;
}
function editBooking(e) {
    displayBookingEditModal();
    var bookingTableRow = e.currentTarget.parentNode.parentNode.parentNode;
    currentBookingTableRow = bookingTableRow;
    var guestID = Number(bookingTableRow.dataset.gid);
    var hotelID = Number(bookingTableRow.dataset.hid);
    populateBookingEditModal(hotelID, guestID, bookingTableRow);
}
bookingUpdateForm.addEventListener('submit', function (e) {
    e.preventDefault();
    bookingUpdateFormSubmitButton.disabled = true;
    var formData = new FormData(bookingUpdateForm);
    if (!formData) {
        throw new Error("booking update form wasn't submitted successfully");
    }
    var bookingData = {
        hotelNumber: currentModalBookingHotelID,
        guestNumber: currentModalBookingGuestID,
        bookingFrom: new Date(formData.get('date_from')),
        bookingUpto: new Date(formData.get('date_upto'))
    };
    updateBooking(currentModalBookingGuestID, currentModalBookingHotelID, bookingData);
});
function updateBooking(guestID, hotelID, bookingData) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/update-booking/booking?guestID=".concat(guestID, "&hotelID=").concat(hotelID), {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(bookingData)
                    })];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        console.error("could not update booking");
                    }
                    else {
                        hideBookingEditModal();
                        /* 2 represents booking from */
                        currentBookingTableRow.dataset.date_from = bookingData.bookingFrom;
                        currentBookingTableRow.children[2].innerHTML = bookingData.bookingFrom;
                        /* 3 represents booking upto */
                        currentBookingTableRow.dataset.date_upto = bookingData.bookingUpto;
                        currentBookingTableRow.children[3].innerHTML = bookingData.bookingUpto;
                    }
                    bookingUpdateFormSubmitButton.disabled = false;
                    return [2 /*return*/];
            }
        });
    });
}
hideBookingEditModal();
getAllBookings();
