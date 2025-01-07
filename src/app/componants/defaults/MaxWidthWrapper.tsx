import { cn } from "@/lib/utils";
import React from "react";

const MaxWidthWrapper = ({
  children,
  className,
  noPadding,
}: {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}) => {
  return (
    <section className={cn("py-5 px-5 md:px-10 lg:px-20 w-full max-w-[1375px]", className || "",{'py-0': noPadding}, {'py-8' : !noPadding})}>
      {children}
    </section>
  );
};

export default MaxWidthWrapper;
