define([
  'jquery',
  'underscore', 
  'backbone',
  'stackmob',
  'text!templates/whisper/whisperTemplate.html'
], function($,_,Backbone, Stackmob, WhisperTemplate){

  var WhisperListView = Backbone.View.extend({   
    tagName: 'ul',

    initialize: function() {
      this.whisperCollection = this.options.whisperCollection;
      this.whisperCollection.bind('all', this.render,this);
      this.template = _.template(WhisperTemplate);
    },

    render:function (e) {
      var el = this.$el,
      whisperCollection = this.whisperCollection,
                template = this.template;

      el.attr("data-role","listview");
      el.attr("data-theme","c");
      el.attr("id","whisperListView");
      el.empty();

      whisperCollection.each(function(model){
        console.log(model.toJSON());
        el.append(template(model.toJSON()));
      });

      if(whisperCollection.length === 0) {  
        el.append('<li>No Whispers</li>');      
      }

      $('#whisperListView').listview('refresh');
     
      return this;
    }

  });

  return WhisperListView;
  
});