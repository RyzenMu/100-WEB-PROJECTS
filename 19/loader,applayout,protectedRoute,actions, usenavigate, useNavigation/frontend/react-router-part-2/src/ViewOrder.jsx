import { useLoaderData } from "react-router-dom";

function ViewOrder() {
  const exixtingOrder = useLoaderData() || [];
  console.log(exixtingOrder);
  console.log(typeof exixtingOrder);
  return (
    <div>
      <h1>This is a view order page</h1>
      {exixtingOrder.map((order, index) => (
        <>
          <p key={index}>Order Id : {order.orderId}</p>
          <p> User Id : {order.userId}</p>
          <p> Pizza type : {order.pizzaType}</p>
          <p> Quantity : {order.quantity}</p>
          <p> Price : {order.price}</p>
        </>
      ))}
    </div>
  );
}

export async function loader() {
  try {
    const response = await fetch("http://localhost:5000/orders");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default ViewOrder;
