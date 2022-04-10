import "./RecipeList.css";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import deleteIcon from "../assets/delete-icon.svg";
import { projectFirestore } from "../firebase/config";
export default function RecipeList({ recipe }) {
    const { mode } = useTheme();
    if(recipe.length === 0) {
        return (
            <div className="error">
                No recipes found.
            </div>
        )
    }

    const handleClick = (id) => {
        projectFirestore.collection("recipes").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

  return (
    <div className="recipe-list">
        {recipe.map(recipe => (
            <div className={`card ${mode}`} key={recipe.id}>
                <h3>{recipe.title}</h3>
                <p>{recipe.cookingTime} to make.</p>
                <div>{recipe.method.substring(0, 100)}...</div>
                <Link to={`/recipe/${recipe.id}`}>Cook This</Link>
                <img
                src={deleteIcon}
                alt="Delete Icon"
                className="delete"
                onClick={() => handleClick(recipe.id)}
                 />
            </div>
        ))}
    </div>
  )
}
