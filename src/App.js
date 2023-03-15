import './App.css';
// import { ThemeProvider } from 'styled-components';
// import media from './assets/style/media';
import RouteMap from './RouteMap';
import { AuthContextProvider } from './context/AuthContext';

export default function App() {
    return (
        <AuthContextProvider>
            <RouteMap />
        </AuthContextProvider>
    );
}
