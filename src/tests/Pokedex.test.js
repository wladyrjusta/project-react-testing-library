import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/RenderWithRouter';

const nextPokemon = 'Próximo Pokémon';
const dataTestId = 'data-testid';
const pokemonType = 'pokemon-type';

describe('Testa o componente <Pokedex.js />', () => {
  it('Verifica se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const headingPokedex = screen.getByRole('heading', { name: 'Encountered Pokémon' });
    expect(headingPokedex).toBeVisible();
  });
  it('Verifica se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    expect(screen.getByText('Pikachu')).toBeVisible();

    const nextPokemonBtn = screen.getByRole('button', { name: nextPokemon });
    expect(nextPokemonBtn).toBeVisible();
    userEvent.click(nextPokemonBtn);
    expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
    expect(screen.queryByText('Charmander')).toBeVisible();
    userEvent.click(nextPokemonBtn);
    expect(screen.queryByText('Caterpie')).toBeVisible();
    expect(screen.queryByText('PikaCharmanderchu')).not.toBeInTheDocument();
    userEvent.click(nextPokemonBtn);
    expect(screen.queryByText('Ekans')).toBeVisible();
    expect(screen.queryByText('Caterpie')).not.toBeInTheDocument();
    userEvent.click(nextPokemonBtn);
    expect(screen.queryByText('Alakazam')).toBeVisible();
    expect(screen.queryByText('Ekans')).not.toBeInTheDocument();
    userEvent.click(nextPokemonBtn);
    expect(screen.queryByText('Mew')).toBeVisible();
    expect(screen.queryByText('Alakazam')).not.toBeInTheDocument();
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    expect(screen.queryByText('Dragonair')).toBeVisible();
    expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
    userEvent.click(nextPokemonBtn);
    expect(screen.queryByText('Pikachu')).toBeVisible();
    expect(screen.queryByText('Dragonair')).not.toBeInTheDocument();
  });
  it('Verifica se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const filterBtns = screen.getAllByTestId('pokemon-type-button');
    expect(filterBtns).toHaveLength(7);
    expect(screen.getByRole('button', { name: 'All' })).toBeVisible();

    const bugPokemonType = filterBtns[2];
    userEvent.click(bugPokemonType);
    expect(screen.queryByText('Caterpie')).toBeVisible();
    expect(screen.getAllByText('Bug')[0]).toHaveAttribute(dataTestId, pokemonType);
    expect(screen.getByRole('button', { name: nextPokemon })).toBeDisabled();

    expect(screen.getByRole('button', { name: 'All' })).not.toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.queryByText('Pikachu')).toBeVisible();

    const firePokemonType = filterBtns[1];
    userEvent.click(firePokemonType);
    expect(screen.queryByText('Charmander')).toBeVisible();
    expect(screen.getAllByText('Fire')[0]).toHaveAttribute(dataTestId, pokemonType);
    expect(screen.getByRole('button', { name: nextPokemon })).not.toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: nextPokemon }));
    expect(screen.queryByText('Rapidash')).toBeVisible();
    expect(screen.getAllByText('Fire')[0]).toHaveAttribute(dataTestId, pokemonType);

    expect(screen.getByRole('button', { name: 'All' })).not.toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.queryByText('Pikachu')).toBeVisible();
  });
  it('Testa botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allPokemonsFilterBtn = screen.getByRole('button', { name: 'All' });
    expect(allPokemonsFilterBtn).toBeVisible();
    expect(allPokemonsFilterBtn).not.toBeDisabled();
    userEvent.click(allPokemonsFilterBtn);
  });
});
