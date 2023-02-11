import { useLocation } from 'react-router-dom';

export function useIsActiveSidebarLink() {
  const isActiveLink = (link, targetIndex = 3) => {
    const currentPath = useLocation().pathname;
    const currentPathSegments = currentPath.split('/');
    let requireSegment = currentPathSegments[targetIndex];

    if (!requireSegment) {
      // console.log('path location of lms was not found and incorrent');
      return;
      // throw new Error('path location of lms was not found and incorrent');
    }
    // console.log('link.includes(requireSegment)', currentPath);
    // console.log('link.includes(requireSegment)', link.includes(requireSegment));

    link = link.toLowerCase();
    requireSegment = requireSegment.toLowerCase();

    return link.includes(requireSegment);
  };

  return isActiveLink;
}

export default useIsActiveSidebarLink;
