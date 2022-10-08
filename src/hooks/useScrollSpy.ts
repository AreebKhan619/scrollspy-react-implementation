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
  triggerInitially?: boolean;
  percentVisibility?: number;
}

interface IndicesRef {
  previous: number | null;
  next: number | null;
}

type ScrollSpyOptions = ScrollSpyOnlyIds | ScrollSpyOnlyRefs;

const useScrollSpy = (options: ScrollSpyOptions) => {
  const positionsRef = useRef<number[]>([]);
  const [indexInFocus, setIndexInFocus] = useState<number | null>(null);
  const indicesRef = useRef<IndicesRef>({ previous: null, next: null });
  const { previous, next } = indicesRef.current;
  const { current: positions } = positionsRef;

  useLayoutEffect(() => {
    if (options.ids) {
      positionsRef.current = options.ids.reduce((posArr, id) => {
        const offsetTop = document.getElementById(id)?.offsetTop;
        if (offsetTop !== undefined) posArr.push(offsetTop);
        return posArr;
      }, [] as typeof positions);
    } else if (options.refs) {
      console.log(options.refs);
    }
  }, []);

  const onUpdate = (focusUpdateIdx: number) => {
    if (!options.ids) return;
    if (indexInFocus !== null) {
      let elClassName = document.getElementById(
        options.ids[indexInFocus]
      )!.className;
      elClassName = elClassName.replace(" active", "");
    }
    document.getElementById(options.ids[focusUpdateIdx])!.className +=
      " active";
  };

  useLayoutEffect(() => {
    const positions = positionsRef.current; // value received properly

    const onScrollListener = (e: any) => {
      if (options.ids) {
        const adjustedScrollPosition = window.scrollY + (options.offset || 0);

        if (indexInFocus !== null) {
          // check if the user is going down
          if (
            adjustedScrollPosition >= positions[indexInFocus] &&
            next &&
            // adjustedScrollPosition >= positions[next]
            adjustedScrollPosition >= positions[next]
          ) {
            console.log("user is scrolling down");
            indicesRef.current.previous = indexInFocus;
            setIndexInFocus(next);
            indicesRef.current.next = next + 1;
          }
          // check if the user is scrolling up
          else if (
            adjustedScrollPosition <= positions[indexInFocus] &&
            adjustedScrollPosition <= positions[previous ?? indexInFocus - 1]
          ) {
            console.log("user is scrolling up");
            setIndexInFocus(previous);
            indicesRef.current.previous = (previous ?? indexInFocus - 1) - 1;
            indicesRef.current.next = indexInFocus;
          }
        } else {
          indicesRef.current.previous = null;
          setIndexInFocus(0);
          indicesRef.current.next = 1;
        }
      }
    };

    onScrollListener(0);

    window.addEventListener("scroll", onScrollListener);
    return () => window.removeEventListener("scroll", onScrollListener);
  }, [indexInFocus]);

  return { inFocus: options.ids?.[indexInFocus || 0] || "" };
};

export default useScrollSpy;
