import React, { useEffect, useLayoutEffect, useRef } from "react";

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
  const lastActiveRef = useRef<string>();

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
        if (lastActiveRef.current !== options.ids[firstMatchIdx]) {
          if (lastActiveRef.current) {
            document.getElementById(lastActiveRef.current)!.className = document
              .getElementById(lastActiveRef.current)!
              .className.replace(" active", "");
          }

          lastActiveRef.current = options.ids[firstMatchIdx];
          document.getElementById(lastActiveRef.current)!.className +=
            " active";
          console.log(options.ids[firstMatchIdx]);
        }
      }
    };

    onScrollListener(0);

    window.addEventListener("scroll", onScrollListener);
    return () => window.removeEventListener("scroll", onScrollListener);
  }, []);
};

export default useScrollSpy;
