import ReactRouter from '@/routes/ReactRouter';
import { useGetTestQuery } from '@/views/auth/api';
import TextEditor from '@/views/tip-tap-editor/TextEditor';

function App() {
  useGetTestQuery();
  return (
    <div className="App">
      <ReactRouter />
      {/* <TextEditor /> */}
    </div>
  );
}

export default App;
