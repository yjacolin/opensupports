const PARSING_TEXT = 0;
const PARSING_MENTION = 1;

class MentionsParser {

    parse(text) {
        let parsingLink = false;
        let parsingType = PARSING_TEXT;
        let parsingSegment = '';
        let ans = '';

        for(let index = 0; index < text.length; ++index){
            let character = text[index];

            if(character == '#'){
                ans += this.compileSegment(parsingSegment, parsingType);

                parsingLink = true;
                parsingType = PARSING_MENTION;
                parsingSegment = '';
            } else if(!this.isAlphanumeric(character) && parsingLink){
                ans += this.compileSegment(parsingSegment, parsingType);

                parsingLink = false;
                parsingType = PARSING_TEXT;
                parsingSegment = character;
            } else {
                parsingSegment += character;
            }
        }

        ans += this.compileSegment(parsingSegment, parsingType);

        return ans;
    }

    isAlphanumeric(string){
        return /[a-zA-Z0-9]/.test(string);
    }
 
    compileSegment(segment, parsingType){
        switch(parsingType){
            case PARSING_TEXT:
                return segment;
            case PARSING_MENTION:
                return '<a href=' + root + '/admin/panel/tickets/view-ticket/' + segment + '>#' + segment + '</a>';
            default:
                return '';
        }
    }
};

export default new MentionsParser;
