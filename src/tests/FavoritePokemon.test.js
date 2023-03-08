import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemon } from '../pages';
import App from '../App';
import renderWithRouter from './utils/RenderWithRouter';

describe('Teste o componente <FavoritePokemon.js />', () => {
  it('Verifica se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    render(<FavoritePokemon />);

    const headerFavoritePokemon = screen.getByText('No favorite Pokémon found');
    expect(headerFavoritePokemon).toBeVisible();
  });
  it('Verifica se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    const setAsFavoriteCheckBox = screen.getByLabelText('Pokémon favoritado?');
    expect(setAsFavoriteCheckBox).toBeInTheDocument();
    userEvent.click(setAsFavoriteCheckBox);

    const linkFavoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(linkFavoritePokemon).toBeInTheDocument();
    userEvent.click(linkFavoritePokemon);

    const favoritePokemonName = screen.getByText('Pikachu');
    expect(favoritePokemonName).toBeVisible();
    const favoritePokemonType = screen.getByText('Electric');
    expect(favoritePokemonType).toBeVisible();
    const favoritePokemonImage = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(favoritePokemonImage).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');

    const noFavoritePokemonName = screen.queryByText('Charmander');
    expect(noFavoritePokemonName).not.toBeInTheDocument();
    const noFavoritePokemonType = screen.queryByText('Fire');
    expect(noFavoritePokemonType).not.toBeInTheDocument();
  });
});
