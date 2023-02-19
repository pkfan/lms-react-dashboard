import ReactRouter from '@/routes/ReactRouter';
import { useGetTestQuery } from '@/views/auth/api';
import FormTest from './views/auth/components/profile/FormTest';

function App() {
  useGetTestQuery();
  return (
    <div className="App">
      <ReactRouter />
    </div>
  );
}

export default App;
