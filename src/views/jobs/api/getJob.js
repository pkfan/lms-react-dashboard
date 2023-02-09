export default function getJob(builder) {
  const jobQuery = builder.query({
    query: (id) => `jobs/${id}`,
  });

  return jobQuery;
}
