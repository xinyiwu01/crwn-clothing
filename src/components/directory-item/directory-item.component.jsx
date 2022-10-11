import './directory-item.styles.scss';

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <div className="directory-item-container"> 
      <div className="background-image" style = {{ // React allows append style in any HTML element: JSX->HTML
        backgroundImage:`url(${imageUrl})` //use string variable in another string
      }}/>
      <div className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;