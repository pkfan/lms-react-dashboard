import { Li, Ul } from '@/components/sxHtmlElements';

const JobRequirementsStyle = {
  padding: 0,
  margin: '8px 18px',
  fontSize: '14px',
};

export function JobRequirements() {
  return (
    <Ul type="circle" sx={JobRequirementsStyle}>
      <Li>High School Diploma or GED.</Li>
      <Li>
        5 or more years experience structured design, databases, algorithms, data structures,
        usability, debugging, and configuration management.
      </Li>
    </Ul>
  );
}

export default JobRequirements;
