import liveStatusEnum from '@/enums/course/liveStatusEnum';

export default function liveStatusAndColor(course) {
  const liveStatusColorOjb = {
    publish: 'green',
    private: 'lmsLayout',
    draft: 'yellow',
  };

  let liveStatus = liveStatusEnum(course.live_status);
  let liveStatusColor = liveStatusColorOjb[liveStatus];
  // console.log('liveStaCol === ', liveStaCol);

  return { liveStatus, liveStatusColor };
}
