type CategorieProps = {
  filterCategory: number;
  onChangeCategory: (id: number) => void;
};

const Categories: React.FC<CategorieProps> = ({ filterCategory, onChangeCategory }) => {
  const catArr = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {catArr.map((value, i) => (
          <li
            onClick={() => onChangeCategory(i)}
            className={filterCategory === i ? 'active' : ''}
            key={i}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
