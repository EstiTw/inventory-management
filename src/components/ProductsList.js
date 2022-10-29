import { useProductsContext } from "../context/products_context";
import Item from "./Item";

const ProductsList = () => {
  const { products } = useProductsContext();

  return (
    <div className="grocery-list">
      {products &&
        products.map((item) => {
          const { id, title } = item;
          return <Item key={id} id={id} title={title} withoutButtons={true} />;
        })}
    </div>
  );
};

export default ProductsList;
