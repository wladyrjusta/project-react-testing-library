import React from 'react';
import { screen, render } from '@testing-library/react';
import { About } from '../pages';

describe('Testa o componente <About.js />', () => {
  it('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);

    const headerAbout = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(headerAbout).toBeVisible();
  });
  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);

    const paragraphAboutOne = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    const paragraphAboutTwo = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');
    expect(paragraphAboutOne).toBeVisible();
    expect(paragraphAboutTwo).toBeVisible();
  });
  it('Verifica se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    render(<About />);

    const imageElement = screen.getByRole('img', { name: 'Pokédex' });
    expect(imageElement).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
