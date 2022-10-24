import { useProductsContext } from "../context/products_context";
import Item from "./Item";

const ProductsList = () => {
  const { products } = useProductsContext();

  const addItems = (e) => {
    e.preventDefault();
    console.log("products added to inventory");
  };

  return (
    <div className="grocery-list">
      {products &&
        products.map((item) => {
          const { id } = item;
          return <Item key={id} id={id} withoutButtons={true} />;
        })}
    </div>
  );
};

export default ProductsList;
