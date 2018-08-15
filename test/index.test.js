import React from 'react';
import Main from '../src/components/Main';
import renderer from 'react-test-renderer';

describe('Components Renders properly', () => {
  it('should Render Main Component into root element and match snapshot', () => {
    const MainCom = renderer.create(<Main/>);
    let tree = MainCom.toJSON();
    expect(tree).toMatchSnapshot();
  });
});