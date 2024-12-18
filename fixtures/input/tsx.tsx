import type { FC } from 'react';
import React from 'react';

interface Props {
  name: string;
       age: number;
}

export const ReactDemo: FC<Props> = (props) => (
  <>
    <div
    className="foo">
      Hello,
      my name is {props.name} and I am {props.age} years old.
    </div>
  </>
);
