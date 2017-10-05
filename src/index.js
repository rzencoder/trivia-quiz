import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import trivia from './components/trivia.js';

ReactDOM.render(<App trivia={trivia}/>, document.getElementById('root'));
registerServiceWorker();
