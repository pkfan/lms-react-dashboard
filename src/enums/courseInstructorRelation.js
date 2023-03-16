export const courseInstructorRelation = (type = 0) => {
  const courseInstructorRelation = ['owner', 'invite'];

  return courseInstructorRelation[type];
};

export default courseInstructorRelation;
