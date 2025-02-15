const express = require("express");

const app = express();
const PORT = 1409;


const products = [
    { id: 1, name: "Laptop", category: "electronics", price: 1200 },
    { id: 2, name: "Phone", category: "electronics", price: 800 },
    { id: 3, name: "T-shirt", category: "fashion", price: 20 },
    { id: 4, name: "Shoes", category: "fashion", price: 50 },
    { id: 5, name: "Headphones", category: "electronics", price: 100 }
];


app.get("/products", (req, res) => {
    const { category } = req.query;

    if (category) {
        const filteredProducts = products.filter(p => p.category === category.toLowerCase());
        return res.json(filteredProducts);
    }

    res.json(products);
});


app.get("/products/:id", (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
});


app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
});