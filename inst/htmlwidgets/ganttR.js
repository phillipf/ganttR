HTMLWidgets.widget({

  name: 'ganttR',

  type: 'output',

  factory: function(el, width, height) {

    var initialized = false;
    var elementId = el.id;
    var customForm = document.createElement('div');
    /*var myHTML = '<div id="my-form"> <label for="description">Task text <input type="text" name="description" value="" > </label> <br> <input type="button" name="save" value="Save"> <input type="button" name="close" value="Close"> <input type="button" name="delete" value="Delete"> </div>';

    customForm.innerHTML = myHTML;
    var form = document.getElementById(customForm.id);*/
    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        // TODO: code to render the widget, e.g.
        //el.innerText = x.message;

       //var tasks = HTMLWidgets.dataframeToD3(x.data);
       var tasks = x;
       if (!initialized) {
          initialized = true;

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd + ' 00:00:00';

        /*var tasks = {
          data:[
             {id:1, text:"#StopAdani", type:gantt.config.types.project, open:true},
             //{id:8, text:"strategy", start_date: today, duration:8, progress: 0.4, parent: 1},
             {id:2, text:"Repower Australia", type:gantt.config.types.project, open:true},
             {id:3, text:"Laws that protect life", type:gantt.config.types.project, open:true},
             {id:4, text:"Be nuclear free", type:gantt.config.types.project, open:true},
             {id:5, text:"Strong Democracy", type:gantt.config.types.project, open:true},
             {id:6, text:"Economy for Life", type:gantt.config.types.project, open:true},
             {id:7, text:"Protected Areas", type:gantt.config.types.project, open:true}
           ]
        };*/
        var taskId = null;


        //gantt.config.fit_tasks = true;
        //gantt.config.autosize = "true";
        gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";
  	    gantt.init(el);

  	    gantt.parse(tasks);

  	    if (HTMLWidgets.shinyMode) {

          var data = JSON.stringify(gantt.serialize());

          /*gantt.attachEvent("onBeforeTaskAdd", function(id,item){

              if(item.parent) {

              }

              return true;
          });*/

  	      gantt.attachEvent("onAfterTaskUpdate", function(id, item) {

              //var data = gantt.serialize();

              Shiny.onInputChange(
                elementId + "_data", JSON.stringify(gantt.serialize())
              );
          });

          gantt.attachEvent("onAfterTaskAdd", function(id, item){

              /*Shiny.onInputChange(
                elementId + "_data", JSON.stringify(gantt.serialize())
              );*/

              Shiny.onInputChange(
                elementId + "_data", JSON.stringify(gantt.serialize())
              );

          });

          gantt.attachEvent("onTaskSelected", function(id){
              Shiny.onInputChange(
                elementId + "_selected", id
              );
          });

          Shiny.onInputChange(
              elementId + "_selected",
              gantt.getSelectedId()
          );


          Shiny.onInputChange(
              elementId + "_data",
              data
          );

  	    }

   }


  //gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";

  //gantt.load('http://localhost:1337/data');

  // keep the order of the lines below
  //var dp = new gantt.dataProcessor('http://localhost:1337/data');
  //dp.init(gantt);
  //dp.setTransactionMode("REST");
      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      },

      addTask : function(params) {
        gantt.addTask(
        {text: "stop adani",
        start_date:"11-04-2018",
        duration:28});
      }/*,

      loadScenario : function(params) {
        gantt.clearAll();
        gantt.parse(params);
      }*/

    };
  }
});

if (HTMLWidgets.shinyMode) {
  /*var fxns = ['addTask'];

  var addShinyHandler = function(fxn) {
    return function() {
      Shiny.addCustomMessageHandler(
        "ganttR:" + fxn, function(message) {
          var el = document.getElementById(message.id);
          if (el) {
            delete message['id'];
            el.widget[fxn](message);
          }
        }
      );
    };
  };

  for (var i = 0; i < fxns.length; i++) {
    addShinyHandler(fxns[i])();
  }*/

  Shiny.addCustomMessageHandler("ganttR:addTask", function(message) {
    var el = document.getElementById(message.id);
    if (el) {
      el.gantt.addTask(
        {text: message.description,
        start_date: message.start,
        duration: message.duration});
    }
  });


}

if (HTMLWidgets.shinyMode) {
    Shiny.addCustomMessageHandler("ganttR:loadScenario", function(message) {
    var el = document.getElementById(message.id);
    if (el) {
      el.gantt.clearAll();
      el.gantt.parse(message.data);
    }
  });
}
