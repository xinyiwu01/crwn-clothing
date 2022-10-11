import './directory.styles.scss';
import DirectoryItem from '../directory-item/directory-item.component';

const Directory = ({categories}) => {
    return (
        <div className="directory-container">
          {categories.map((category) => (            //use {} because it's a variable, just like {title}
          //when map things use id as key
            <DirectoryItem key={category.id} category={category}/>
          ))}
        </div>
      )
}

export default Directory;