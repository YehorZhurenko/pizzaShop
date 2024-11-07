import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface IPizza {
  imageUrl: string;
  title: string;
  price: number;
}

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<IPizza>();
  const { id } = useParams();

  async function fetchPizza() {
    try {
      const { data } = await axios.get('https://64d4f976b592423e4694f8ad.mockapi.io/items/' + id);

      setPizza(data);

      console.log('done fetch for ' + id);
    } catch (error) {}
  }

  useEffect(() => {
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>'Загрузка ...'</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h1>{pizza.title}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, fuga. Quo dignissimos velit
        harum magnam corporis cumque, consectetur amet facere assumenda non, commodi error autem
        quisquam vitae. Aliquid, dolores ducimus?
      </p>
      <h4>{pizza.price} p</h4>
    </div>
  );
};

export default FullPizza;
