import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import Login from '../Login';

afterEach(cleanup);
describe('Login renders correctly', () => {
  it('<h2> has correct text', () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId('h2-login-test')).toHaveTextContent('Zendesk Ticket Viewer');
  });

  it('Link has correct text', () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId('a-login-test')).toHaveTextContent('Login with Zendesk');
  });

  it('Link has correct attibute', () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId('a-login-test')).toHaveAttribute('href', 'http://localhost:5000/oauth');
  });

  it('Matches snapshot', () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
