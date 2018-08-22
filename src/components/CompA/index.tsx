/**
 * Shared component
 */
import * as React from 'react';
import './style/index.scss';

class Comp extends React.Component<{}, any> {
  private greet = async () => {
    const response = await browser.runtime.sendMessage({ type: 'GREETING' });
    alert(`Background 😄  Script: "${response}"`);
    console.log(response);
  }

  render() {
    return (
      <div className='comp-a'>
        <h1 className='comp-a-title'>This is a shared component</h1>
        <button onClick={this.greet}>Say Hi to Background Script!</button>
      </div>
    );
  }
}

export default Comp;
