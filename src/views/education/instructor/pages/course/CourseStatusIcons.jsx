import { BsDashSquare, BsCheck2Square, BsXSquare } from '@/components/icons';

export function CourseStatusIcons({ status }) {
  return (
    <>
      {status == 'disable' && (
        <BsDashSquare size={16} style={{ color: 'black', backgroundColor: 'white' }} />
      )}
      {status == 'check' && (
        <BsCheck2Square size={16} style={{ color: 'green', backgroundColor: 'white' }} />
      )}
      {status == 'cross' && (
        <BsXSquare size={16} style={{ color: 'red', backgroundColor: 'white' }} />
      )}
    </>
  );
}

export default CourseStatusIcons;
