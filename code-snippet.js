/**
 * Code snippet widget module
 *
 * @param {H5P.jQuery} $
 */
 H5PEditor.widgets.codeSnippet = H5PEditor.CodeSnippet = (function ($) {
 
  /**
   * Creates code snippet.
   *
   * @class H5PEditor.CodeSnippet
   *
   * @param {Object} parent
   * @param {Object} field
   * @param {string} params
   * @param {H5PEditor.SetParameters} setValue
   */
  function C(parent, field, params, setValue) {
    this.parent = parent;
    this.field = field;
    this.params = params;
    this.setValue = setValue;
    this.editor = null;

    this.changes = [];
  }

  /**
   * Append the field to the wrapper.
   *
   * @param {H5P.jQuery} $wrapper
   */
  C.prototype.appendTo = function ($wrapper) {
    var self = this;
    
    self.$container = $('<div>', {
      'class': 'field text h5p-code-snippet'
    });
 
    // Add header:
    $('<span>', {
      'class': 'h5peditor-label',
      html: self.field.label
    }).appendTo(self.$container);
 
    // Create input field
    self.$codeSnippet = $('<textarea>', {
      'class': 'h5p-code-snippet'
    })
    .val(self.htmlDecode(this.params))
    .appendTo(self.$container);

    // Add description:
    $('<span>', {
      'class': 'h5peditor-field-description',
      html: self.field.description
    }).appendTo(self.$container)
   
    self.$container.appendTo($wrapper);
    
    // Add CodeMirror to $codeSnippet
    self.editor = CodeMirror.fromTextArea(self.$codeSnippet.get(0), {
      readOnly: false,
      autofocus: false,
      smartIndent: true,
      indentUnit: 4,
      indentWithTabs: true,
      lineWrapping: true,
      foldGutter: true,
      autofocus: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      styleActiveLine: true,
      lineNumbers: true
    });

    self.editor.refresh();

    // set value on change
    self.editor.on('change', function(doc, delta) {
      self.params = doc.getValue();
      self.setValue(self.field, self.params);

      self.changes.forEach(function (cb) {
        cb(self.params);
      })
    });
  };
  
  /**
   * Validate the current values.
   *
   * @returns {boolean}
   */
  C.prototype.validate = function () {
    return (this.params !== undefined && this.params.length !== 0);
  };
  
  /**
   * Remove the current field
   */
  C.prototype.remove = function () {
    var self = this;
    self.editor.destroy();
    self.editor.container.remove();
  };

  C.prototype.htmlDecode = function(input) {
    var element = document.createElement('textarea');
    element.innerHTML = input;
    return element.childNodes.length === 0 ? "" : element.childNodes[0].nodeValue;
  }
  
  
  return C;
})(H5P.jQuery);