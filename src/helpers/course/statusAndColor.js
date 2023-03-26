import statusEnum from '@/enums/course/statusEnum';

export default function statusAndColor(course) {
  const statusColorOjb = {
    pending: 'orange',
    approved: 'teal',
    reject: 'pink',
    blocked: 'red',
  };

  let status = statusEnum(course.status);
  let statusColor = statusColorOjb[status];

  // console.log('liveStatus === ', liveStatus);
  return { status, statusColor };
}
