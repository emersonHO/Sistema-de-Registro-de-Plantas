import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Wrapper para React Router
const AppWrapper = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

describe('App Component', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  test('renders app title in navbar', async () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    render(
      <AppWrapper>
        <App />
      </AppWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText(/Sistema de Registro de Hierbas/i)).toBeInTheDocument();
    });
  });

  test('redirects to login when no user is logged in', async () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    render(
      <AppWrapper>
        <App />
      </AppWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument();
    });
  });

  test('shows user navigation when logged in', async () => {
    const mockUser = {
      id: 1,
      email: 'test@test.com',
      nombre: 'Test',
      apellido: 'User'
    };
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));
    
    render(
      <AppWrapper>
        <App />
      </AppWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText(/Hola, Test User/i)).toBeInTheDocument();
    });
  });

  test('shows loading spinner initially', () => {
    render(
      <AppWrapper>
        <App />
      </AppWrapper>
    );

    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();
  });
});
