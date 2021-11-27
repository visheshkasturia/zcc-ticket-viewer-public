import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import NotFound from '../NotFound';

afterEach(cleanup);
describe('NotFound renders correctly', () => {
  it('<h1> has correct text', () => {
    const { getByTestId } = render(<NotFound />);
    expect(getByTestId('h1-nf-test')).toHaveTextContent('Looks like something went wrong and you landed in the wrong place . Quick try again!.');
  });

  it('Image has correct alt attibute', () => {
    const { getByTestId } = render(<NotFound />);
    expect(getByTestId('img-nf-test')).toHaveAttribute('alt', 'Oh my goodness GIF');
  });

  it('Matches snapshot', () => {
    const tree = renderer.create(<NotFound />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
