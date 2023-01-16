import * as React from "react";
import { pipe, range, toArray } from "@fxts/core";

interface Props extends React.PropsWithChildren {
  count: number;
}

function Repeat({ count, children }: Props) {
  return count > 0 ? (
    <>
      {pipe(range(count), toArray).map((_, index) => (
        <React.Fragment key={index}>{children}</React.Fragment>
      ))}
    </>
  ) : null;
}

export default Repeat;
