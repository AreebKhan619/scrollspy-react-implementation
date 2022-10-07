import React from "react";
import useScrollSpy from "../hooks/useScrollSpy";

interface ScrollSpyContainerProps {
  children: any;
  offset?: number;
  elementIds: string[];
}

const ScrollSpyContainer: React.FC<ScrollSpyContainerProps> = ({
  children,
  offset = 48,
  elementIds,
}) => {
  const { inFocus: activeId = "" } = useScrollSpy({
    ids: elementIds,
    offset,
  });

  return (
    <>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          className: `${child.props.className.replace(" selected", "") || ""} ${
            child.props["aria-label"] === activeId ? "selected" : ""
          }`,
        });
      })}
    </>
  );
};

export default ScrollSpyContainer;
