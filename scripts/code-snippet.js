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
    self.$codeSnippet = $('<div>', {
      'class': 'h5p-code-snippet'
    }).appendTo(self.$container);

    // Add description:
    $('<span>', {
      'class': 'h5peditor-field-description',
      html: self.field.description
    }).appendTo(self.$container)
   
    self.$container.appendTo($wrapper);
    
    // Add Ace Editor to $codeSnippet
    self.editor = ace.edit(self.$codeSnippet.get(0));

    // set value on hange
    self.editor.session.on('change', function(delta) {
      self.params = self.editor.getValue();
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
    console.log(this);
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
  
  return C;
})(H5P.jQuery);