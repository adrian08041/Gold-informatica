import { CartContext, CartProduct } from "@/providers/cart";
import Image from "next/image";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon, Trash, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity, removeProductFromCart } =
    useContext(CartContext);

  const handleDecreaseProductQuantityClick = () => {
    decreaseProductQuantity(product.id);
  };

  const handleIncreaseProductQuantityClick = () => {
    increaseProductQuantity(product.id);
  };

   const handleRemoveProductQuantityClick = () => {
    removeProductFromCart(product.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="items flex gap-4">
        {/* PARTE DIREITA FOTO E NOME  */}

        <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-backgroundItems">
          <Image
            src={product.imageUrls[0]}
            width={0}
            height={0}
            sizes="100vw"
            alt={product.name}
            className="max-w-[80%]: h-auto max-h-[70%] w-auto"
          />
        </div>

        <div className="intems-center flex flex-col justify-center">
          <p className="text-xs">{product.name}</p>

          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">
              R$ {product.totalPrice.toFixed(2)}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-75">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="h-8 w-8"
              size="icon"
              variant="ghost"
              onClick={handleDecreaseProductQuantityClick}
            >
              <ArrowLeftIcon size={12} />
            </Button>
            <span className="gap-1 text-xs">{product.quantity}</span>
            <Button
              className="h-8 w-8"
              size="icon"
              variant="ghost"
              onClick={handleIncreaseProductQuantityClick}
            >
              <ArrowRightIcon size={12} />
            </Button>
          </div>
        </div>
      </div>
      <div>
        {/* PARTE ESQUERDA BOTAO DE DELETAR */}

        <Button className="h-8 w-8" size="icon" variant="ghost" onClick={handleRemoveProductQuantityClick}>
          <TrashIcon size={16} />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
