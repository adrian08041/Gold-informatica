import { Badge } from "@/components/ui/badge";
import ProductItem from "@/components/ui/product-item";
import { computeProductTotalPrice } from "@/helpers/product";

import { prismaClient } from "@/lib/prisma";
import { PercentIcon } from "lucide-react";

const DealsPage = async () => {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });
  return (
    <div className="flex flex-col gap-5 p-5 lg:p-10">
      <Badge className="w-fit gap-1 border-2 border-dourado px-3 py-[0.375rem] text-base uppercase">
        <PercentIcon size={16} />
        Ofertas
      </Badge>
      <div className="grid grid-cols-2 gap-8 lg:flex lg:flex-wrap lg:gap-10">
        {deals.map((product) => (
          <ProductItem
            key={product.id}
            product={{
              ...product,
              totalPrice: computeProductTotalPrice(product),
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DealsPage;
