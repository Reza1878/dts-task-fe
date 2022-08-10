import clsx from "clsx";
import React, { HTMLAttributes } from "react";

interface PageTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

function PageTitle(props: PageTitleProps) {
  const { children, className } = props;
  return <h5 className={clsx("text-xl font-medium", className)}>{children}</h5>;
}

export default PageTitle;
