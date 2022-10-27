---
to: <%= absPath %>/<%= component_name %>.tsx
---
import style from './<%= component_name %>.module.sass';

type Props = {};

export const <%= component_name %> = (props: Props) => {
  console.log(style);
  return <div></div>;
};
