import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './utils/RenderWithRouter';

const favoritesPokemons = 'Favorite Pokémon';

describe('Testa o componente <App.js />', () => {
  it('Verifica se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();
    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();
    const linkFavoritePokemon = screen.getByRole('link', { name: favoritesPokemons });
    expect(linkFavoritePokemon).toBeInTheDocument();
  });
  it('Verifica se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const headerHome = screen.getByRole('heading', { name: 'Encountered Pokémon' });
    expect(headerHome).toBeVisible();
  });
  it('Verifica se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const headerAbout = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(headerAbout).toBeVisible();
  });
  it('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavoritePokemon = screen.getByRole('link', { name: favoritesPokemons });
    userEvent.click(linkFavoritePokemon);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const headerFavorites = screen.getByRole('heading', { name: favoritesPokemons });
    expect(headerFavorites).toBeVisible();
  });
  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    const invalidURL = 'notarote';

    act(() => {
      history.push(invalidURL);
    });

    const notFoundHeader = screen.getByRole('heading', { name: 'Page requested not found' });
    expect(notFoundHeader).toBeVisible();
  });
});
