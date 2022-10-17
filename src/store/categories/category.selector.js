import { createSelector } from "reselect";

const selectCategoryReducer = (state) =>state.categories;

//runs only when input selector changes = cache
export const selectCategories = createSelector(
   //input selector
   [selectCategoryReducer],
   // output selector
   //from input selector
   (categoriesSlice) => categoriesSlice.categories
)

// as long as categories array doesn't change, it will not re-render
export const selectCategoriesMap = createSelector(
   [selectCategories],
   (categories) => 
     categories.reduce((acc, category) => {
      const {title, items} = category; // object
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
)


// export const selectCategoriesMap = (state) => 
//    state.categories.categories.reduce((acc, category) => {
//       const {title, items} = category; // object
//       acc[title.toLowerCase()] = items;
//       return acc;
//     }, {}) // {} reducer always return a new object
    //explict return without {} and 'return'
// see chrome inspect