import { ShoppingCart } from "lucide-react";

function Shop() {

    return (    
        <section className="flex flex-col justify-center items-center">
            <nav className="flex justify-between w-[90vw] p-3 px-16 backdrop-blur-md rounded-xl bg-white/10">
                {/* Brand Name */}
                 <h1 className="font-bold text-3xl">NobleRide</h1>
                {/* Nav Bar */}
                <ul className="flex justify-between gap-5">
                    <li>Home</li>
                    <li>Products</li>
                    <li>Contact Us</li> 
                </ul>
                {/* Cart */}
                <ShoppingCart strokeWidth={3} />
            </nav>
           
        </section>
    );
}

export default Shop;