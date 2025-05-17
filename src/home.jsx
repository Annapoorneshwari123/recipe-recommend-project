import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import { Link } from 'react-router-dom';

const emojiList = ['👍', '❤️', '😋', '🤮'];
const areas = [
  'American', 'British', 'Canadian', 'Chinese', 'Dutch', 'Egyptian',
  'French', 'Greek', 'Indian', 'Irish', 'Italian', 'Jamaican',
  'Japanese', 'Kenyan', 'Malaysian', 'Mexican', 'Moroccan',
  'Russian', 'Spanish', 'Thai', 'Tunisian', 'Turkish', 'Vietnamese'
];

function Home() {
  const [selectedArea, setSelectedArea] = useState('Canadian');
  const [meals, setMeals] = useState([]);
  const [reactions, setReactions] = useState({});
  const [clickedEmoji, setClickedEmoji] = useState(null);

  useEffect(() => {
    if (selectedArea) {
      fetchMeals(selectedArea);
    } else {
      setMeals([]);
    }
  }, [selectedArea]);

  const fetchMeals = async (area) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    const data = await res.json();
    setMeals(data.meals || []);
  };

  const handleReaction = (mealId, emoji) => {
    setReactions(prev => ({
      ...prev,
      [mealId]: emoji
    }));
    setClickedEmoji(`${mealId}-${emoji}`);
    setTimeout(() => setClickedEmoji(null), 300);
  };

  return (
    <section className="container">
      <motion.div
        className='hero'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className='overlay m-auto'></div>
        <h2 className='title'>World Cuisine Explorer</h2>
        <br />
        <p>"Every dish tells a story — of tradition, love, and a taste that lingers in the heart."</p>
      </motion.div>

      <FormControl fullWidth className="mb-4">
        <InputLabel>Choose Area</InputLabel>
        <Select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          label="Choose Area"
        >
          <MenuItem value="">-- Select an Area --</MenuItem>
          {areas.map(area => (
            <MenuItem key={area} value={area}>{area}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className="row">
        <AnimatePresence>
          {meals.map((meal) => (
            <motion.div
              className="col-md-4 mb-4"
              key={meal.idMeal}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <Card className='card'>
                <center>
                  <CardContent>
                    <Typography className="card-content-title" variant="h6">
                      {meal.strMeal}
                    </Typography>

                    <motion.img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="img-fluid rounded mt-2"
                      style={{ maxHeight: '300px', objectFit: 'cover', transition: 'transform 0.4s ease-in-out' }}
                      whileHover={{ scale: 1.05 }}
                    />
                  </CardContent>

                  <CardActions>
                    {emojiList.map((emoji) => (
                      <motion.div
                        key={emoji}
                        whileTap={{ scale: 1.5 }}
                        animate={
                          clickedEmoji === `${meal.idMeal}-${emoji}`
                            ? { scale: [1, 1.3, 1] }
                            : { scale: 1 }
                        }
                        transition={{ duration: 0.3 }}
                      >
                        <Button
                          className="emoji-button"
                          size="medium"
                          onClick={() => handleReaction(meal.idMeal, emoji)}
                          variant={reactions[meal.idMeal] === emoji ? "contained" : "text"}
                          sx={{ fontSize: '1.5rem', minWidth: '40px' }}
                        >
                          {emoji}
                        </Button>
                      </motion.div>
                    ))}
                    <Link to={`/meal/${meal.idMeal}`}>
                      <Button className='recipe-btn' size="small">
                        View Recipe
                      </Button>
                    </Link>
                  </CardActions>
                </center>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.footer
        className="text-center mt-5 p-4 bg-light rounded"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <Typography variant="body2" className='text'>
          Select your favorite region to see traditional dishes from around the world.
        </Typography>
      </motion.footer>
    </section>
  );
}

export default Home;
