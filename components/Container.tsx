import clsx from "clsx";
import React, { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

function Container(props: ContainerProps) {
  const { className, children } = props;
  return (
    <div
      className={clsx(className, "container mx-auto px-6 lg:px-24 mt-4 mb-4")}
    >
      {children}
    </div>
  );
}

export default Container;
