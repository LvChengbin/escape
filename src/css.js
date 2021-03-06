/**
 * To escape special characters of CSS string.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape
 * @see https://drafts.csswg.org/cssom/#the-css.escape()-method
 * @see https://drafts.csswg.org/cssom/#serialize-an-identifier
 */

export default function( str ) {
    if( CSS && CSS.escape ) {
        return CSS.escape( str );
    }

    if( !arguments.length ) {
        throw new TypeError( 'Failed to execute "escape" on "CSS": 1 argument required, but only 0 present.' );
    }

    str = String( str );

    let result = '';

    for( let i = 0, l = str.length; i < l; i += 1 ) {
        const unit = str.charCodeAt( i );

        // If the character is NULL (U+0000), then the REPLACEMENT CHARACTER (U+FFFD).
        if( unit === 0x000 ) {
            result += '\uFFFD';
        }

        // If the character is in the range [\1-\1f] (U+0001 to U+001F) or is U+007F, then the character escaped as code point.
        if( unit >= 0x0001 && unit <= 0x001F || unit === 0x007F ) {
            result += '\\' + unit.toString( 16 ) + ' '
        }

        // If the character is the first character and is in the range [0-9] (U+0030 to U+0039), then the character escaped as code point.
        if( i === 0 && unit >= 0x0030 && unit <= 0x0039 ) {
            result += '\\' + unit.toString( 16 ) + ' '
        }

        // If the character is the second character and is in the range [0-9] (U+0030 to U+0039) and the first character is a "-" (U+002D), then the character escaped as code point.
        if( i === 1 && unit >= 0x0030 && unit <= 0x0039 && str.charCodeAt( 0 ) === 0x002D ) {
            result += '\\' + unit.toString( 16 ) + ' '
        }

        // If the character is the first character and is a "-" (U+002D), and there is no second character, then the escaped character.
        if( i === 0 && l === 1 && unit === 0x002D )  {
            result += '\\-';
        }

        // If the character is not handled by one of the above rules and is greater than or equal to U+0080, is "-" (U+002D) or "_" (U+005F), or is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to U+005A), or \[a-z] (U+0061 to U+007A), then the character itself.
        if ( unit >= 0x0080 || unit == 0x002D || unit == 0x005F || unit >= 0x0030 && unit <= 0x0039 || unit >= 0x0041 && unit <= 0x005A || unit >= 0x0061 && unit <= 0x007A ) {
			result += str.charAt( i );
			continue;
		}

        // Otherwise, the escaped character.
        result += '\\' + str.charAt( i );
    }

    return result;
}
