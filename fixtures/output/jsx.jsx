export function HelloWorld(_props) {
  const props = mergeProps({ greeting: 'hello', greeted: '"World"', silent: false }, _props);
  if (!props.greeting) {
    return null;
  }

  // TODO: Don't use random in render
  const num = Math.floor(Math.random() * 1e7)
    .toString()
    .replace(/\.\d+/g, '');

  return (
    <div
      class='HelloWorld'
      title={`You are visitor number ${num}`}
      onMouseOver={props.onMouseOver}
    >
      <strong>{props.greeting.slice(0, 1).toUpperCase() + props.greeting.slice(1).toLowerCase()}</strong>
      {props.greeting.endsWith(',') ? ' ' : <span style={{ color: 'grey' }}>", "</span>}
      <em>{props.greeted}</em>
      {props.silent ? '.' : '!'}
    </div>
  );
}
