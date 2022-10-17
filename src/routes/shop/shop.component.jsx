import { useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './shop.styles.scss';
import Category from '../category/category.component';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategories } from '../../store/categories/category.action';


const Shop = () => {
    const dispatch = useDispatch();
    useEffect(()=> {
        // in use effect, any async thing should be wrapped in a new async function, can't directly async () => {}
        const getCategoryMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments();
            console.log(categoriesArray);
            dispatch(setCategories(categoriesArray));
        }
        getCategoryMap(); // invoke after creating
       }, [])
   return (
    <Routes>
        <Route index element={<CategoriesPreview/>}/>   
        <Route path=":category" element={<Category />} />
    </Routes>
   )
}

export default Shop;