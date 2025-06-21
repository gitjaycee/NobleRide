import { useState, useEffect } from "react";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
}

function Admin() {
    const [products, setProducts] = useState<Product[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        description: ""
    });

    useEffect(() => {
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.name || !formData.price || !formData.image) {
            alert('Please fill in all required fields');
            return;
        }

        const productData: Product = {
            id: editingProduct?.id || Date.now().toString(),
            name: formData.name,
            price: parseFloat(formData.price),
            image: formData.image,
            description: formData.description
        };

        if (editingProduct) {
            setProducts(products.map(p => p.id === editingProduct.id ? productData : p));
        } else {

            setProducts([...products, productData]);
        }
        setFormData({ name: "", price: "", image: "", description: "" });
        setShowForm(false);
        setEditingProduct(null);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price.toString(),
            image: product.image,
            description: product.description || ""
        });
        setShowForm(true);
    };

    const handleDelete = (productId: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== productId));
        }
    };

    const handleCancel = () => {   
        setShowForm(false);
        setEditingProduct(null);
        setFormData({ name: "", price: "", image: "", description: "" });
    };

    return (
        <div className="min-h-screen bg-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-[#173D54] mb-2">Admin Dashboard</h1>
                        <p className="text-gray-600">Welcome!</p>
                    </div>
                    <button
                        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Sign Out
                    </button>
                </div>
                
                {/* Product Management Section */}
                <div className="bg-blue-50 p-8 rounded-lg shadow-md mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-[#173D54]">Product Management</h2>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-[#173D54] text-white px-6 py-2 rounded-lg hover:bg-[#122f40] transition"
                        >
                            Add New Product
                        </button>
                    </div>

                    {/* Product Form */}
                    {showForm && (
                        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                            <h3 className="text-xl font-semibold text-[#173D54] mb-4">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4 text-black">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Product Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173D54]"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="Price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        step="0.01"
                                        min="0"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173D54]"
                                        required
                                    />
                                </div>
                                <input
                                    type="url"
                                    name="image"
                                    placeholder="Image URL"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173D54]"
                                    required
                                />
                            
                                <div className="flex gap-4">
                                    <button
                                        type="submit"
                                        className="bg-[#173D54] text-white px-6 py-2 rounded-lg hover:bg-[#122f40] transition"
                                    >
                                        {editingProduct ? 'Update Product' : 'Add Product'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Product List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                    }}
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold text-[#173D54] text-lg mb-2">{product.name}</h3>
                                    <p className="text-2xl font-bold text-[#173D54] mb-4">₱{product.price.toFixed(2)}</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {products.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500 text-lg">No products added yet. Click "Add New Product" to get started.</p>
                        </div>
                    )}
                </div>

                {/* Other Admin Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="font-semibold text-[#173D54] mb-2">User Management</h3>
                        <p className="text-sm text-gray-600">Manage customer accounts</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="font-semibold text-[#173D54] mb-2">Products</h3>
                        <p className="text-sm text-gray-600">{products.length} products</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="font-semibold text-[#173D54] mb-2">Order Management</h3>
                        <p className="text-sm text-gray-600">Process customer orders</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="font-semibold text-[#173D54] mb-2">Analytics</h3>
                        <p className="text-sm text-gray-600">View sales reports</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;