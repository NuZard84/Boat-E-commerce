import { useGlobalContext } from "@/context/CreateState";
import Cart from "./Cart";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

const Navbar = () => {
  const { showCart, setShowCart, cartItems, qty } = useGlobalContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href={"/"}>Boat E-commerce</Link>
      </p>

      <button
        className="cart-icon"
        type="button"
        onClick={() => setShowCart((cur) => !cur)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{cartItems.length}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
