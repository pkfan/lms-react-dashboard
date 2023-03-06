import ReactRouter from '@/routes/ReactRouter';
import { useGetTestQuery } from '@/views/auth/api';
import TextEditor from '@/views/tip-tap-editor/TextEditor';
import DragDropInput from './views/roles/instructor/pages/course/components/DragDropInput';

function App() {
  useGetTestQuery();
  return (
    <div className="App">
      <ReactRouter />
      {/* <TextEditor /> */}
      {/* <DragDropInput /> */}
    </div>
  );
}

export default App;
