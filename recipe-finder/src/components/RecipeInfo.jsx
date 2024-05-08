import React,{useState} from 'react'
import { useParams } from 'react-router-dom'

const RecipeInfo=()=> {
    const [item,setItem]=useState();
    const {MealId}=useParams();
  
    if(MealId!=="")
    {
       fetch(`https:/www.themealdb.com/api/json/v1/1/lookup.php?i=${MealId}`)
       .then(res=>res.json())
       .then(data=>{
        setItem(data.meals[0])
       })
    }
    
    return (
        <>
          {
            (!item)?"":(<>
            <div className="content">
                 <img src={item.strMealThumb} alt="" />
                 <div className="inner-content">
                      <h1>{item.strMeal}</h1>
                      <h2>{item.strArea} Food</h2>
                      <h3>Category{item.strCategory}</h3>
                 </div>
             </div>
            <div className="recipe-details">
                 <div className="ingredients">
                  <h2>Ingredients</h2><br/>
                    
                      {Object.keys(item).map((key, index) => {
    
                   if (key.includes('strIngredient') && item[key]) {
                    const ingredientNumber = key.slice(-1);
                    const measureKey = `strMeasure${ingredientNumber}`;
                    const measure = item[measureKey];
                    return (
                    <h4 key={index}>{item[key]}: {measure}</h4>
                   );
                  }
                   return null;
                  })}
    
                 </div>
                 <div className="instructions">
                      <h2>Instructions</h2><br/>
                      <h4>{item.strInstructions}</h4>
                 </div>
            </div>
            </>)
          }
    
        </>
      )
    }


    export default RecipeInfo