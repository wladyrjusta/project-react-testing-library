import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/RenderWithRouter';

const moreDetails = 'More details';

describe('Testa o componente <PokemonDetails.js />', () => {
  it('Verifica se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: moreDetails });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    const headingDetails = screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });
    expect(headingDetails).toBeVisible();
    expect(moreDetailsLink).not.toBeVisible();
    const summaryHeading = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(summaryHeading).toBeVisible();
    const pokemonDetailsParagraph = screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
    expect(pokemonDetailsParagraph).toBeVisible();
  });
  it('Verifica se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: moreDetails });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    const locationsHeading = screen.getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 });
    expect(locationsHeading).toBeVisible();

    const locationMapNameOne = screen.getByText('Kanto Viridian Forest');
    const locationMapNameTwo = screen.getByText('Kanto Power Plant');
    expect(locationMapNameOne).toBeVisible();
    expect(locationMapNameTwo).toBeVisible();

    const locationMapImgs = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(locationMapImgs[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationMapImgs[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('Verifica se o usuário pode favoritar um Pokémon através da página de detalhe', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: moreDetails });
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

    userEvent.click(screen.getByRole('link', { name: moreDetails }));
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémon' }));

    expect(screen.getByText('No favorite Pokémon found')).toBeVisible();
  });
});
