import Container from "@/app/components/Container";
import OrderDetails from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";

// Объявляем тип для параметра
interface IParams {
    orderId?: string;
}

// Объявляем компонент асинхронным
const Order = async ({ params }: { params: Promise<IParams> }) => {
    // Ожидаем разрешения Promise для параметров
    const { orderId } = await params;

    // Получаем данные о заказе по orderId
    const order = await getOrderById({ orderId });

    // Если заказ не найден, возвращаем компонент NullData
    if (!order) return <NullData title="No Order" />;

    return (
        <div className="p-8">
            <Container>
                <OrderDetails order={order} />
            </Container>
        </div>
    );
};

export default Order;
