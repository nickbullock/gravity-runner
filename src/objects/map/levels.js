/**
 * Created by Oleg Rusak on 26.03.2017.
 */

"use strict";

class Levels {
    static get state () {

        return {
            NON_STAR: 0,
            ONE_STAR: 1,
            TWO_STAR: 2,
            THREE_STAR: 3,
            CLOSE: 4
        }
    }
}

export default Levels;
