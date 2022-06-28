declare module 'rollup-plugin-modify' {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const modify: (options: { find: string | RegExp; replace: string; }) => Function;

  export default modify;
}
