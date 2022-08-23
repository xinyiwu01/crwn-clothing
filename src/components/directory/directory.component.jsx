import CategoryItem from "../category-item/category-item.component"
import './directory.styles.scss';

const Directory = ({categories}) => {
    return (
        <div className="directory-container">
          {categories.map((category) => (            //use {} because it's a variable, just like {title}
          //when map things use id as key
            <CategoryItem key={category.id} category={category}/>
          ))}
        </div>
      )
}

export default Directory;