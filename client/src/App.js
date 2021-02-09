import Routes from './Routes';
import createStore from './redux/createStore'
import { Provider } from 'react-redux'

const store = createStore();

function App() {
  return (
    <Provider store={store}>
      <Routes/>
    </Provider>
  );
}

export default App;
