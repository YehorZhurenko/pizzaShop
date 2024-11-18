import React, { useState, useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate, Link } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import Pagination from '../Pagination';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sort = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const searchValue = useSelector((state) => state.filter.searchValue);

  const items = useSelector((state) => state.pizza.items);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const sortBy = sort.replace('-', '');
    const order = sort.includes('-') ? 'asc' : 'desc';
    const filterBlock = categoryId > 0 ? 'category=' + categoryId + '&' : '';
    const searchBlock = searchValue ? '&search=' + searchValue : '';

    dispatch(fetchPizzas({ sortBy, order, filterBlock, searchBlock, currentPage }));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );

      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    console.log('categoryId: ' + categoryId);
    getPizzas();
  }, [categoryId, sort, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort,
        categoryId,
        currentPage,
      });

      console.log('stringify: ', queryString);
      console.log('categoryId: ' + categoryId);
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, searchValue, currentPage]);

  const pizzas = items.map((pizza) => (
    <Link key={pizza.id} to={`pizza/${pizza.id}`}>
      <button
        style={{
          all: 'unset',
        }}
        onClick={(e) => e.preventDefault()}>
        <PizzaBlock {...pizza} />
      </button>
    </Link>
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
