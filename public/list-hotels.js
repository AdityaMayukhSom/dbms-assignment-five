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
var table = document.querySelector("table");
function getAllHotels() {
    return __awaiter(this, void 0, void 0, function () {
        var res, hotelData, _i, hotelData_1, hotel, row, HnoCell, HnameCell, CityCell, PhoneCell, Room_typeCell, PriceCell, priceInINR, EditDeleteBtnContainerRow, EditDeleteBtnContainer, editBtn, deleteBtn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:5000/get-all-hotels')];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    hotelData = _a.sent();
                    for (_i = 0, hotelData_1 = hotelData; _i < hotelData_1.length; _i++) {
                        hotel = hotelData_1[_i];
                        row = table.insertRow();
                        row.dataset.hid = hotel.Hno;
                        HnoCell = row.insertCell();
                        HnoCell.innerText = hotel.Hno;
                        HnoCell.style.textAlign = "center";
                        HnameCell = row.insertCell();
                        HnameCell.innerText = hotel.Hname;
                        CityCell = row.insertCell();
                        CityCell.innerText = hotel.City;
                        PhoneCell = row.insertCell();
                        PhoneCell.innerText = hotel.Phone;
                        Room_typeCell = row.insertCell();
                        Room_typeCell.innerText = hotel.Room_type;
                        PriceCell = row.insertCell();
                        priceInINR = (hotel.Price).toLocaleString('en-IN', {
                            style: 'currency',
                            currency: 'INR'
                        });
                        PriceCell.innerText = priceInINR;
                        PriceCell.style.textAlign = "right";
                        PriceCell.style.padding = "12px";
                        EditDeleteBtnContainerRow = row.insertCell();
                        EditDeleteBtnContainer = document.createElement('div');
                        EditDeleteBtnContainerRow.appendChild(EditDeleteBtnContainer);
                        editBtn = document.createElement('button');
                        editBtn.innerText = 'Edit';
                        editBtn.classList.add('edit-button-style');
                        deleteBtn = document.createElement('button');
                        deleteBtn.innerText = 'Delete';
                        deleteBtn.classList.add('delete-button-style');
                        deleteBtn.addEventListener('click', deleteHotel);
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
function handleEdit() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
function deleteHotel(e) {
    return __awaiter(this, void 0, void 0, function () {
        var tableRow, hotelNumber, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tableRow = e.currentTarget.parentNode.parentNode.parentNode;
                    hotelNumber = Number(tableRow.dataset.hid);
                    return [4 /*yield*/, fetch("http://localhost:5000/delete-hotel/".concat(hotelNumber), {
                            method: 'DELETE'
                        })];
                case 1:
                    res = _a.sent();
                    if (res.ok) {
                        console.log(hotelNumber + ' hotel deleted');
                        tableRow.remove();
                    }
                    else {
                        console.log('some error occurred');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
getAllHotels();
