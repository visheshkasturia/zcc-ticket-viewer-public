import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import Tickets from '../Tickets';

describe('Ticket renders correctly', () => {
  it('Matches snapshot', () => {
    const tree = renderer.create(<Tickets />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
