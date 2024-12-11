import axios from 'axios';

export const sendToFlask = async (req, res) => {
    try {
        // Replace this with logic to send the actual file in a POST request.
        const response = await axios.post('http://localhost:5001/send');
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error communicating with the Python service');
    }
};


