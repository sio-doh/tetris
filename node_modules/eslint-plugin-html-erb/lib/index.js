/**
 * @fileoverview Ignore Rails code in ERB template
 * @author Pierre-Michel Brown
 */
'use strict';

module.exports.processors = {
  '.erb': {
    preprocess: function(text) {
      var scriptRegex = /(<script[^>]*>)(((?!<\/script>)[\s\S])+)<\/script>/g;

      text = text.replace(scriptRegex, function(match, openingTag, jsCode) {
        jsCode = jsCode.replace(/<%=?((?!%>)[\s\S])*%>/g, 'window');
        return openingTag + jsCode + '</script>';
      });

      return [text];
    },

    postprocess: function(messages) {
      return messages[0];
    },
  },
};
