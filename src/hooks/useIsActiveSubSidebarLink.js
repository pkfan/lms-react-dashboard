import { useLocation } from 'react-router-dom';

export function useIsActiveSubSidebarLink() {
  const isActiveLink = (link) => {
    const currentPath = useLocation().pathname;

    return link.toLowerCase() == currentPath.toLowerCase();
  };

  return isActiveLink;
}

export default useIsActiveSubSidebarLink;
