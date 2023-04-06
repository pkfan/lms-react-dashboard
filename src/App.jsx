import ReactRouter from '@/routes/ReactRouter';
import { useGetTestQuery } from '@/views/auth/api';
import MyDataTable from './components/MyDataTable';
import Example from './components/DataTabelComponentExampls/Example';

function App() {
  useGetTestQuery();
  return (
    <div className="App">
      <ReactRouter />
      {/* <MyDataTable /> */}
      {/* <Example /> */}
      {/* <h1>App loaded...</h1> */}
    </div>
  );
}

export default App;
