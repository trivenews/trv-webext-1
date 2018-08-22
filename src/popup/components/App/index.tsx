import * as React from 'react';
// import './style/index.scss';
const logo = browser.runtime.getURL('static/icons/trive-32.png');
class App extends React.Component<{}, any> {
  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Trive Webextension</h2>
        </div>
      </div>
    );
  }
}
export default App;
