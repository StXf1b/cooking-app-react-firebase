import "./Create.css"
import { useState, useRef } from "react"
import { useHistory } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';
export default function Create() {
  const [title, setTitle] = useState("")
  const [cookingTime, setCookingTime] = useState("")
  const [method, setMethod] = useState("")
  const [newIngredients, setNewIngredients] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);

  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const doc = { title, cookingTime: cookingTime + " minutes", method, ingredients };
    try {
      await projectFirestore.collection("recipes").add(doc)
      history.push("/")
    } catch (err) {
      console.log(err);
    }
  }
  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredients.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngridients => [...prevIngridients, ing]);
    }
    setNewIngredients("");
    ingredientInput.current.focus();
  }


  return (
    <div className='create'>
        <h2 className='page-title'>Add a New Recipe</h2>

        <form method='POST' onSubmit={handleSubmit}>
          <label>
            <span>Recipe title:</span>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
              />
          </label>
          
          <label>
            <span>Recipe ingredient:</span>
              <div className='ingridients'>
                <input
                  type="text"
                  onChange={(e) => setNewIngredients(e.target.value)}
                  value={newIngredients}
                  ref={ingredientInput}
                 />
                <button onClick={handleAdd} className='btn'>add</button>
              </div>
          </label>
          <p>Current ingridients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>
          <label>
            <span>Recipe method:</span>
            <textarea 
              onChange={(e) => setMethod(e.target.value)}
              value={method}
              required
            />
          </label>

          <label>
            <span>Cooking time(minutes):</span>
            <input type="number" 
              onChange={(e) => setCookingTime(e.target.value)}
              value={cookingTime}
              required
            />
          </label>
          <button className='btn'>Submit</button>
        </form>
    </div>
  )
}
