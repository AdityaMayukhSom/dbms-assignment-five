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
var currentModalGuestID = -1;
var currentGuestTableRow;
var guestTable = document.getElementById("guest-table");
var guestModalBackground = document.getElementById('guest-modal-background');
var guestModalCloseButton = document.getElementById('guest-modal-close-button');
guestModalCloseButton.addEventListener('click', hideGuestEditModal);
var guestUpdateForm = document.getElementById("modal-guest-update-form");
var guestUpdateFormSubmitButton = document.getElementById('guest-update-form-submit-button');
var modalGuestName = document.getElementById('guest-name');
var modalGuestAddress = document.getElementById('guest-address');
var modalGuestPhoneNumber = document.getElementById('guest-phone-number');
function getAllGuests() {
    return __awaiter(this, void 0, void 0, function () {
        var res, guestData, _i, guestData_1, guest, row, guestNumberCell, guestNameCell, guestAddressCell, guestPhoneNumberCell, EditDeleteBtnContainerRow, EditDeleteBtnContainer, editBtn, deleteBtn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:5000/get-all-guests')];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    guestData = _a.sent();
                    for (_i = 0, guestData_1 = guestData; _i < guestData_1.length; _i++) {
                        guest = guestData_1[_i];
                        row = guestTable.insertRow();
                        row.dataset.gid = guest.Gno;
                        row.dataset.gname = guest.Gname;
                        row.dataset.gaddress = guest.Address;
                        row.dataset.gphonenumber = guest.Phone;
                        guestNumberCell = row.insertCell();
                        guestNumberCell.innerText = guest.Gno;
                        guestNumberCell.style.textAlign = "center";
                        guestNameCell = row.insertCell();
                        guestNameCell.innerText = guest.Gname;
                        guestAddressCell = row.insertCell();
                        guestAddressCell.innerText = guest.Address;
                        guestPhoneNumberCell = row.insertCell();
                        guestPhoneNumberCell.innerText = guest.Phone;
                        EditDeleteBtnContainerRow = row.insertCell();
                        EditDeleteBtnContainer = document.createElement('div');
                        EditDeleteBtnContainerRow.appendChild(EditDeleteBtnContainer);
                        editBtn = document.createElement('button');
                        editBtn.innerText = 'Edit';
                        editBtn.classList.add('edit-button-style');
                        editBtn.addEventListener('click', editGuest);
                        deleteBtn = document.createElement('button');
                        deleteBtn.innerText = 'Delete';
                        deleteBtn.classList.add('delete-button-style');
                        deleteBtn.addEventListener('click', deleteGuest);
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
function displayGuestEditModal() {
    guestModalBackground.classList.remove('hidden');
}
function hideGuestEditModal() {
    guestModalBackground.classList.add('hidden');
}
function deleteGuest(e) {
    return __awaiter(this, void 0, void 0, function () {
        var tableRow, guestID, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tableRow = e.currentTarget.parentNode.parentNode.parentNode;
                    guestID = Number(tableRow.dataset.gid);
                    return [4 /*yield*/, fetch("http://localhost:5000/delete-guest/".concat(guestID), {
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
function populateGuestEditModal(guestID, guestTableRow) {
    currentModalGuestID = guestID;
    modalGuestName.value = guestTableRow.dataset.gname;
    modalGuestAddress.value = guestTableRow.dataset.gaddress;
    modalGuestPhoneNumber.valueAsNumber = Number(guestTableRow.dataset.gphonenumber);
}
function editGuest(e) {
    displayGuestEditModal();
    var guestTableRow = e.currentTarget.parentNode.parentNode.parentNode;
    currentGuestTableRow = guestTableRow;
    var guestID = Number(guestTableRow.dataset.gid);
    populateGuestEditModal(guestID, guestTableRow);
}
guestUpdateForm.addEventListener('submit', function (e) {
    e.preventDefault();
    guestUpdateFormSubmitButton.disabled = true;
    var formData = new FormData(guestUpdateForm);
    if (!formData) {
        throw new Error("hotel input form wasn't submitted successfully");
    }
    var guestData = {
        guestName: formData.get('guest_name').trim(),
        guestAddress: formData.get('guest_address').trim(),
        guestPhoneNumber: Number(formData.get('guest_phone_number'))
    };
    updateGuest(currentModalGuestID, guestData);
});
function updateGuest(guestID, guestData) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(guestData);
                    return [4 /*yield*/, fetch("http://localhost:5000/update-guest/".concat(guestID), {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(guestData)
                        })];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        console.error("could not update guest with guestID ".concat(guestID));
                    }
                    else {
                        hideGuestEditModal();
                        /* 1 represents hotel name */
                        currentGuestTableRow.dataset.gname = guestData.guestName;
                        currentGuestTableRow.children[1].innerHTML = guestData.guestName;
                        /* 2 represents hotel city */
                        currentGuestTableRow.dataset.gaddress = guestData.guestAddress;
                        currentGuestTableRow.children[2].innerHTML = guestData.guestAddress;
                        /* 3 represents hotel phone */
                        currentGuestTableRow.dataset.gphonenumber = "".concat(guestData.guestPhoneNumber);
                        currentGuestTableRow.children[3].innerHTML = "".concat(guestData.guestPhoneNumber);
                    }
                    guestUpdateFormSubmitButton.disabled = false;
                    return [2 /*return*/];
            }
        });
    });
}
hideGuestEditModal();
getAllGuests();
