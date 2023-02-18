import { BsFillCheckSquareFill, BsFillXSquareFill, BsDashSquareFill } from 'react-icons/bs';

export function CourseStatusIcons({ status }) {
  return (
    <>
      {status == 'disable' && (
        <BsDashSquareFill size={16} style={{ color: 'black', backgroundColor: 'white' }} />
      )}
      {status == 'check' && (
        <BsFillCheckSquareFill size={16} style={{ color: 'green', backgroundColor: 'white' }} />
      )}
      {status == 'cross' && (
        <BsFillXSquareFill size={16} style={{ color: 'red', backgroundColor: 'white' }} />
      )}
    </>
  );
}

export default CourseStatusIcons;
