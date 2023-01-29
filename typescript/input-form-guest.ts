export interface GuestDataType {
    guestName: string,
    guestAddress: string,
    guestPhoneNumber: number
}

const guestInputForm = document.getElementById("guest-input-form") as HTMLFormElement;
if (!guestInputForm) {
    throw new Error('guest input form not found');
}

guestInputForm.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();
    const guestFormData = new FormData(guestInputForm);
    const guestData: GuestDataType = {
        guestName: (guestFormData.get('guest_name') as string).trim(),
        guestAddress: (guestFormData.get('guest_address') as string).trim(),
        guestPhoneNumber: Number(guestFormData.get('guest_phone_number'))
    }

    createGuest(guestData);
});

async function createGuest(guestData: GuestDataType) {
    const res: Response = await fetch('http://localhost:5000/guestinput', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(guestData)
    })

    if (!res.ok) {
        console.error('could not create guest')
    }
}