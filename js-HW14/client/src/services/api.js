const URL = 'http://localhost:3000/notes';

export const getNotes = async () => {
    try {
    const response = await  fetch(URL);
    const data =  response.json();
        return data;
    } catch(error) {
        throw error;
    };
};

export const saveNotes = async(note) => {
    const opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    };
    try {
        const response = await fetch(URL, opts);
        const data = response.json();
        return data;
    } catch(error) {
        throw new Error('Error while fetching' + response.statusText);
    };
};

export const deleteNotes = async(id) => {
    const opts = {
        method: 'DELETE'
    };

    try {
        const response = await fetch(`${URL}/${id}`, opts);
        const data = response.json();
        return data;
    
    } catch(error) {
        throw new Error('Error while fetching' + response.statusText);
    }
        
};   