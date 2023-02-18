import ReactRouter from '@/routes/ReactRouter';
import { useGetTestQuery } from '@/views/auth/api';

function App() {
  useGetTestQuery();
  return (
    <div className="App">
      <ReactRouter />
    </div>
  );
}

export default App;
