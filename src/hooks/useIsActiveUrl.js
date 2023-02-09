import { useLocation } from 'react-router-dom';

export function useIsActiveUrl() {
  const isActive = (link, targetIndex = 2) => {
    const currentPath = useLocation().pathname;
    const currentPathSegments = currentPath.split('/');
    let requireSegment = currentPathSegments[targetIndex];

    if (!requireSegment) {
      throw new Error('path location of lms was not found and incorrent');
    }
    console.log('link.includes(requireSegment)', link.includes(requireSegment));

    link = link.toLowerCase();
    requireSegment = requireSegment.toLowerCase();

    return link.includes(requireSegment);
  };

  return isActive;
}

export default useIsActiveUrl;
