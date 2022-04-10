import { useState, useEffect } from 'react'
import "./Recipe.css"
import { useParams } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { projectFirestore } from '../../firebase/config';
export default function Recipe() {
    const { id } = useParams();
    const [ recipe, setRecipe] = useState(null);
    const [ isPending, setIsPending] = useState(false);
    const [ error, setError] = useState(false);
    const { mode } = useTheme();

    useEffect(() => {
        setIsPending(true);
        const unsub = projectFirestore.collection("recipes").doc(id).onSnapshot((doc) => {
            if(doc.exists) {
                setRecipe(doc.data());
                setIsPending(false);
            }else {
                setIsPending(false);
                setError("No recipe found");
            }
        })
        return () => unsub();
    }, [id])
    const handleClick = () => {
        projectFirestore.collection("recipes").doc(id).update({
            title: "Something NEW"
        })
    }
  return (
    <div className={`recipe ${mode}`}>
        {error && <p className='error'>{error}</p>}
        {isPending && <p className='loading'>Loading...</p>}
        {recipe && (
            <div key={recipe.id}>
                <h2 className='page-title'>{recipe.title}</h2>
                <p>{recipe.cookingTime} to make.</p>
                <ul>
                    {recipe.ingredients.map(ingredients => (
                        <li key={ingredients.id}>{ingredients}</li>
                    ))}
                </ul>
                <p className='method'>{recipe.method}</p>
                <button onClick={handleClick}>Update</button>
            </div>
        )}
    </div>
  )
}
