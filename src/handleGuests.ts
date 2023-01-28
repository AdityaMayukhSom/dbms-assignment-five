import { db, GuestDataType } from "./middleware";

export function addNewGuest(guestData: GuestDataType): void {
    const { guestName, guestAddress, guestPhoneNumber } = guestData;
    db.run(`insert into Guest (Gname, Address, Phone) 
    values ("${guestName}", "${guestAddress}", ${guestPhoneNumber})`, (err: Error) => {
        if (err) {
            console.error(err.message)
            throw err;
        }
    })
}