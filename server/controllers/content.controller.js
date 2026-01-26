const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/content.json');

// Helper to read data
const readData = () => {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return {};
    }
};

exports.getContent = (req, res) => {
    const data = readData();
    res.status(200).send(data);
};

exports.updateContent = (req, res) => {
    const newData = req.body;

    // Basic validation could go here

    fs.writeFile(dataPath, JSON.stringify(newData, null, 2), (err) => {
        if (err) {
            return res.status(500).send({ message: "Error saving content" });
        }
        res.status(200).send({ message: "Content updated successfully!", data: newData });
    });
};
