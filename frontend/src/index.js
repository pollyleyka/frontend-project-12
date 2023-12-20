import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import init from './init.jsx';
import store from './store/index.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const initComponent = await init();
  root.render(
    <Provider store={store}>
      {initComponent}
    </Provider>,
  );
};

app();
