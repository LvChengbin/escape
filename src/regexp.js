/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 */
export default str => str.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' );
