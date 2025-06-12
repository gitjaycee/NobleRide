// src/components/Shop.tsx
import { useAuth } from "../contexts/AuthContext";

function Shop() {
    const { userProfile, signOut } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className="min-h-screen bg-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-[#173D54] mb-2">Shop</h1>
                        <p className="text-gray-600">Welcome, {userProfile?.name}!</p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Sign Out
                    </button>
                </div>
                
                <div className="bg-blue-50 p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-[#173D54] mb-4">Customer Dashboard</h2>
                    <p className="text-gray-700">
                        This is the shop page for customers. Here you can browse products, 
                        make purchases, and manage your orders.
                    </p>
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="font-semibold text-[#173D54]">Browse Products</h3>
                            <p className="text-sm text-gray-600 mt-2">Explore our catalog</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="font-semibold text-[#173D54]">My Orders</h3>
                            <p className="text-sm text-gray-600 mt-2">Track your purchases</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="font-semibold text-[#173D54]">My Account</h3>
                            <p className="text-sm text-gray-600 mt-2">Manage your profile</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shop;