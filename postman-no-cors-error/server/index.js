const express = require('express');
const fs = require('fs').promises;
const cors = require('cors')

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
};

// app.use(cors())
app.use(cors(corsOptions))

const PORT = 8000;


// Middleware
app.use(express.json());

// Configuration
const DATA_FILE = './data.json';

// GET Endpoint
app.get('/users', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        res.status(200).json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Failed to read data' });
    }
});

// DELETE Endpoint
app.delete('/users/:id', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        let jsonData = JSON.parse(data);
        
        const filteredData = jsonData.filter(item => item.id !== req.params.id);
        
        await fs.writeFile(DATA_FILE, JSON.stringify(filteredData, null, 2));
        
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

// Server Start
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
