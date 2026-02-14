import { useEffect } from 'react';

const BASE_TITLE = 'الشيخ محمد بابحر رحمه الله';

/**
 * Sets the document title for SEO.
 * @param pageTitle - The page-specific title. Will be appended to the base title.
 * @param standalone - If true, uses pageTitle as-is without appending base title.
 */
const usePageTitle = (pageTitle?: string, standalone?: boolean) => {
  useEffect(() => {
    if (!pageTitle) {
      document.title = BASE_TITLE;
    } else if (standalone) {
      document.title = pageTitle;
    } else {
      document.title = `${pageTitle} | ${BASE_TITLE}`;
    }

    return () => {
      document.title = BASE_TITLE;
    };
  }, [pageTitle, standalone]);
};

export default usePageTitle;
