import { db, GuestDataType } from "./middleware";

export async function addNewGuest(guestData: GuestDataType): Promise<void> {
    const { guestName, guestAddress, guestPhoneNumber } = guestData;
    return new Promise((resolve, reject) => {
        db.run(`insert into Guest (Gname, Address, Phone) values ("${guestName}", "${guestAddress}", ${guestPhoneNumber})`,
            (err: Error) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
    });
}

export async function getAllGuests(): Promise<any[]> {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM Guest', (err: Error, rows: any[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

export async function deleteGuest(guestID: number): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`delete from Guest where Gno = (?)`, guestID, (err: Error) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export async function updateGuest(guestID: number, guestData: GuestDataType): Promise<void> {
    const { guestName, guestAddress, guestPhoneNumber } = guestData;
    return new Promise((resolve, reject) => {
        db.run(`update Guest set Gname = "${guestName}", Address = "${guestAddress}", Phone = ${guestPhoneNumber} where Hno = ${guestID}`, (err: Error) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}