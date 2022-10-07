import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

interface ScrollSpyOnlyIds extends ScrollSpyBasics {
  ids?: never;
  refs: React.RefObject<HTMLElement>[];
}

interface ScrollSpyOnlyRefs extends ScrollSpyBasics {
  refs?: never;
  ids: string[];
}

interface ScrollSpyBasics {
  offset?: number;
}

type ScrollSpyOptions = ScrollSpyOnlyIds | ScrollSpyOnlyRefs;

const useScrollSpy = (options: ScrollSpyOptions) => {
  const [inFocus, setInFocus] = useState<string>();

  useLayoutEffect(() => {
    let positions: number[];
    if (options.ids) {
      positions = options.ids.reduce((posArr, id) => {
        const offsetTop = document.getElementById(id)?.offsetTop;
        if (offsetTop !== undefined) posArr.push(offsetTop);
        return posArr;
      }, [] as typeof positions);
    } else if (options.refs) {
      console.log(options.refs);
    }

    const onScrollListener = (e: any) => {
      if (options.ids) {
        const currentScrollPosition = window.scrollY;
        const firstMatchIdx = positions.findIndex(
          (position) =>
            (position || 0) > currentScrollPosition - (options.offset || 0)
        );
        if (inFocus !== options.ids[firstMatchIdx]) {
          if (inFocus) {
            document.getElementById(inFocus)!.className = document
              .getElementById(inFocus)!
              .className.replace(" active", "");
          }
          setInFocus(options.ids[firstMatchIdx]);
          document.getElementById(options.ids[firstMatchIdx])!.className +=
            " active";
        }
      }
    };

    onScrollListener(0);

    window.addEventListener("scroll", onScrollListener);
    return () => window.removeEventListener("scroll", onScrollListener);
  }, [inFocus]);

  return { inFocus };
};

export default useScrollSpy;
