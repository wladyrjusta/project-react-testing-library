import React from 'react';
import { screen, render } from '@testing-library/react';
import { NotFound } from '../pages';

describe('Testa o componente <NotFound.js />', () => {
  it('Verifica se a página contém um heading h2 com o texto Page requested not found', () => {
    render(<NotFound />);

    const headerNotFound = screen.getByRole('heading', { name: 'Page requested not found', level: 2 });
    expect(headerNotFound).toBeVisible();
  });
  it('Verifica se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);

    const imageElement = screen.getByRole('img', { name: 'Pikachu crying because the page requested was not found' });
    expect(imageElement).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
