import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

type PizzaItem = {
  imageUrl: string;
  title: string;
  price: number;
};

export const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<PizzaItem>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(
          "https://6304c03394b8c58fd7244553.mockapi.io/items/" + id
        );

        setPizza(data);
      } catch (error) {
        alert("Error when getting pizza!");
        navigate("/");
      }
    };

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Loading...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <p>{pizza.price} ₴</p>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>To main page</span>
        </button>
      </Link>
    </div>
  );
};
