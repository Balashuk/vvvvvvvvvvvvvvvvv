import Container from "@/app/components/Container";
import ListRating from "./ListRating";
import ProductDetails from "./ProductDetails";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";

// Тип для параметров маршрута
interface IParams {
  productId?: string;
}

// Объявляем компонент асинхронным
const Product = async ({ params }: { params: Promise<IParams> }) => {
  // Делаем resolve параметров
  const resolvedParams = await params;
  const { productId } = resolvedParams;

  if (!productId) {
    return <NullData title="Product ID is required" />;
  }

  // Получаем продукт и пользователя
  const product = await getProductById({ productId });
  const user = await getCurrentUser();

  if (!product) {
    return <NullData title="Product with the given ID does not exist" />;
  }

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <AddRating product={product} user={user} />
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
