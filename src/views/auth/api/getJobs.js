export default function getJobs(builder) {
  const jobsQuery = builder.query({
    query: () => 'jobs',
  });

  return jobsQuery;
}
