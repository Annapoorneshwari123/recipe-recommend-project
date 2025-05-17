import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Button } from '@mui/material';
import { motion } from 'framer-motion';
import './App.css';

function MealDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => {
        setMeal(data.meals[0]);
      });
  }, [id]);

  const renderIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients.map((ing, idx) => <li key={idx}>{ing}</li>);
  };

  if (!meal) return <p className="text-center mt-5">Loading meal details...</p>;

  return (
    <section className="meal-container">
    
      <CardContent>
        <Typography className="meal-title" variant="h4">{meal.strMeal}:</Typography>
        <div className="image-wrapper">
  <motion.img
    src={meal.strMealThumb}
    alt={meal.strMeal}
    className="meal-image"
    whileHover={{ scale: 1.05 }}
    transition={{
      duration: 0.6,
      ease: 'easeInOut'
    }}
  />
</div>

        <Typography className="meal-info">
          <strong>Category:</strong> {meal.strCategory} | <strong>Area:</strong> {meal.strArea}
        </Typography>

        <Typography className="meal-section-title">Ingredients:</Typography>
        <ul className="meal-ingredients">{renderIngredients()}</ul>

        <Typography className="meal-section-title">Instructions:</Typography>
        <Typography className="meal-instructions">{meal.strInstructions}</Typography>

        {/* {meal.strYoutube && (
          <Button
            variant="contained"
            color="secondary"
            href={meal.strYoutube}
            target="_blank"
            className="mt-3"
          >
            🎥 Watch on YouTube
          </Button>
        )} */}

        <div className="back-button">
          <Link to="/">
            <Button>⬅ Back to Meals</Button>
          </Link>
        </div>
      </CardContent>
   
  </section>
  );
}

export default MealDetails;
