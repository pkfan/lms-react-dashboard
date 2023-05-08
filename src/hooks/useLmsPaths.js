import { useLocation } from 'react-router-dom';

export function useLmsPaths() {
  const currentPath = useLocation().pathname;

  const wherePathNot = (path, targetIndex = 2) => {
    let link = path;
    const currentPathSegments = currentPath.split('/');
    let requireSegment = currentPathSegments[targetIndex];

    if (!requireSegment) {
      return false;
    }

    link = link.toLowerCase();
    requireSegment = requireSegment.toLowerCase();

    const pathNot = !link.includes(requireSegment);

    return pathNot;
  };

  return { wherePathNot };
}

export default useLmsPaths;
