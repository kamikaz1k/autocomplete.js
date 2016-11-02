// autocomplete.js
(function () {

  function Autocomplete () {
    this.dictionary = {};
    this.wordCount = 0;
  }

  // Add word prototype
  Autocomplete.prototype.addWord = function (word) {
    var current = this.dictionary;
    for (i in word) {
      i = word[i];
      if (current[i]) {
          current[i].words.push(word);

      } else {
        current[i] = {
          words: [word],
          children: {}
        };
      }
      current = current[i].children
    }
    return ++this.wordCount;
  }

  // Get word prototype
  Autocomplete.prototype.getSuggestions = function (pattern) {
    var current = this.dictionary, key = "", previous = { words: [] };
    // Stop one level short, so that you don't lose your reference
    for (i in pattern) {
      key = pattern[i];
      if (current[key]) {
        previous = current[key];
        current = current[key].children;
      } else {
        return [];
      }
    }
    
    return previous.words;
  }

  console.log(Autocomplete);

  if (window) {
    window.Autocomplete = Autocomplete;
  } else if (module) {
    module.export = Autocomplete;
  } else {
    // now what?
  }
})();