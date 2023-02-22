import ReactRouter from '@/routes/ReactRouter';
import { useGetTestQuery } from '@/views/auth/api';
import FormTest from './views/auth/components/profile/FormTest';
import TextEditor from './components/tip-tap-editor/TextEditor';

function App() {
  useGetTestQuery();
  return (
    <div className="App">
      {/* <ReactRouter /> */}
      <TextEditor />
    </div>
  );
}

export default App;
