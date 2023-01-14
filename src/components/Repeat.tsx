import * as React from "react";
import { pipe, repeat, toArray } from "@fxts/core";

interface Props extends React.PropsWithChildren {
  count: number;
}

function Repeat({ count, children }: Props) {
  return count > 0 ? <>{pipe(repeat(count, children), toArray)}</> : null;
}

export default Repeat;
