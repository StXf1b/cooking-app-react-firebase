import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Page components imports
import Navbar from "./components/Navbar";
import Home from './pages/home/Home';
import Search from './pages/search/Search';
import Create from './pages/create/Create';
import Recipe from './pages/recipe/Recipe';
import ThemeSelector from './components/ThemeSelector';
import { useTheme } from './hooks/useTheme';

function App() {
  const { mode } = useTheme();
  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/recipe/:id" component={Recipe} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App
