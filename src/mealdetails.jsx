import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import './mealdetailes.css'

function MealDetails() {
  const { id } = useParams();
   const navigate = useNavigate();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await res.json();
      setMeal(data.meals[0]);
    };
    fetchMeal();
  }, [id]);

  if (!meal) {
    return (
      <div className="loading-spinner">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Container className="meal-details-container">
      <motion.div
        className="meal-image-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="meal-image"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      <Card
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="meal-details-card"
      >
        <CardContent>
          <Typography className="meal-title">
  {meal.strMeal}
</Typography>


          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {meal.strArea} | {meal.strCategory}
          </Typography>

          <div className="tags">
            <Chip label={meal.strCategory} color="primary" variant="outlined" />
            <Chip label={meal.strArea} color="secondary" variant="outlined" />
          </div>

          <Typography variant="h6" className="section-title mb-3">
            Ingredients:
          </Typography>
          <ul className="ingredients-list">
            {[...Array(20)].map((_, i) => {
              const ingredient = meal[`strIngredient${i + 1}`];
              const measure = meal[`strMeasure${i + 1}`];
              return ingredient && (
                <li key={i}>
                  {ingredient} - {measure}
                </li>
              );
            })}
          </ul>

          <Typography variant="h6" className="section-title mb-3">
            Instructions:
          </Typography>
          <Typography variant="body1" className="instructions">
            {meal.strInstructions}
          </Typography>
          <button
        className="back-button"
        onClick={() => navigate('/')}
      >
        ⬅ Back to Home
      </button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default MealDetails;
