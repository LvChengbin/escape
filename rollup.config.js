import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default [ {
    input : 'src/index.js',
    plugins : [
        resolve( {
            module : true,
            jsnext : true
        } )
    ],
    output : [
        { file : 'dist/escape.cjs.js', format : 'cjs' },
        { file : 'dist/escape.js', format : 'umd', name : 'escape' }
    ]
}, {
    input : 'src/index.js',
    plugins : [
        resolve( {
            module : true,
            jsnext : true
        } ),
        babel()
    ],
    output : [
        { file : 'dist/escape.bc.js', format : 'umd', name : 'escape' }
    ]
} ];
