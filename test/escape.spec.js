import escape from '../src/index';

describe( 'escape', () => {

    it( 'html', () => {
        it( 'Should get correct output', () => {
            expect( escape.html( 'abc<>&\'"123' ) ).toEqual( 'abc&lt;&gt;&amp;&#39;&quot;123' );
        } );
    } );

    it( 'regexp', () => {
        const chars = '[.*+?^${}()|[]\\]';
        expect( escape.regexp( chars ) ).toEqual( '\\[\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\\\]');
    } );

    it( 'css', () => {
        const strings = [
            '\u0000',
            '\u0001',
            '\u001F',
            '-',
            '0',
            '9',
            '-9',
            '!@#$%^&*(',
            '.fjakl9432#@%$%#13213'
        ];
        if( window.CSS && window.CSS.escape ) {
            for( let string of strings ) {
                expect( escape.css( string ) ).toEqual( CSS.escape( string ) );
            }
        }
    } );

    it( 'string', () => {
        expect( escape.string( 'aA-\'"\\\n\r\u2028\u2029' ) ).toEqual( 'aA-\\\'\\"\\\\\\n\\r\\u2028\\u2029' );
    } );

} );
