import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/RenderWithRouter';

const moreDetails = 'More details';

describe('Testa o componente <Pokemon.js />', () => {
  it('Verifica se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeVisible();
    const pokemonType = screen.getAllByText('Electric');
    expect(pokemonType[0]).toHaveAttribute('data-testid', 'pokemon-type');
    const pokemonAverageWeight = screen.getByText('Average weight: 6.0 kg');
    expect(pokemonAverageWeight).toBeVisible();
    const pokemonImage = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(pokemonImage).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Verifica se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon.', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: moreDetails });
    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink).toHaveProperty('href', 'http://localhost/pokemon/25');
  });
  it('Verifica se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon e se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: moreDetails });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    const headingPokemonDetails = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(headingPokemonDetails).toBeVisible();

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });
  it('Verifica se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    const setAsFavoriteCheckBox = screen.getByLabelText('Pokémon favoritado?');
    expect(setAsFavoriteCheckBox).toBeInTheDocument();
    userEvent.click(setAsFavoriteCheckBox);

    const starImage = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(starImage).toBeVisible();
    expect(starImage).toHaveAttribute('src', '/star-icon.svg');
  });
});
