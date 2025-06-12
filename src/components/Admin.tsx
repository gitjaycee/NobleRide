// src/components/Admin.tsx
import { useAuth } from "../contexts/AuthContext";

function Admin() {
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
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-[#173D54] mb-2">Admin Dashboard</h1>
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
                    <h2 className="text-2xl font-semibold text-[#173D54] mb-4">Admin Panel</h2>
                    <p className="text-gray-700 mb-6">
                        This is the admin dashboard. Here you can manage users, products, 
                        orders, and system settings.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-semibold text-[#173D54] mb-2">User Management</h3>
                            <p className="text-sm text-gray-600">Manage customer accounts</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-semibold text-[#173D54] mb-2">Product Management</h3>
                            <p className="text-sm text-gray-600">Add, edit, remove products</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-semibold text-[#173D54] mb-2">Order Management</h3>
                            <p className="text-sm text-gray-600">Process customer orders</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-semibend text-[#173D54] mb-2">Analytics</h3>
                            <p className="text-sm text-gray-600">View sales reports</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;