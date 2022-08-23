import './category-item.styles.scss';

const CategoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <div className="category-container"> 
      <div className="background-image" style = {{ // React allows append style in any HTML element: JSX->HTML
        backgroundImage:`url(${imageUrl})` //use string variable in another string
      }}/>
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;