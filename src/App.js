import './App.css';
// import { ThemeProvider } from 'styled-components';
// import media from './assets/style/media';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RouteMap from './RouteMap';
import { AuthContextProvider } from './context/AuthContext';

export default function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <AuthContextProvider>
                <RouteMap />
            </AuthContextProvider>
        </QueryClientProvider>
    );
}
