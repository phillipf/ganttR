HTMLWidgets.widget({

  name: 'ganttR',

  type: 'output',

  factory: function(el, width, height) {

    var initialized = false;
    var elementId = el.id;

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        // TODO: code to render the widget, e.g.
        //el.innerText = x.message;

       if (!initialized) {
          initialized = true;

          /*gantt.form_blocks["my_editor"] = {
              render:function(sns) {
                  return "<div class='dhx_cal_ltext' style='height:60px;'>Text&nbsp;"
                  +"<input type='text'><br/>Holders&nbsp;<input type='text'></div>";
              },
              set_value:function(node, value, task,section) {
                  node.childNodes[1].value = value || "";
                  node.childNodes[4].value = task.users || "";
              },
              get_value:function(node, task,section) {
                  task.users = node.childNodes[4].value;
                  return node.childNodes[1].value;
              },
              focus:function(node) {
                  var a = node.childNodes[1];
                  a.select();
                  a.focus();
              }
          };

          gantt.config.lightbox.sections = [
          { name:"description", height:200, map_to:"text", type:"my_editor", focus:true},
          {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"},
          { name:"time", height:72, type:"duration", map_to:"auto"}
          ];
          gantt.locale.labels["section_parent"] = "Parent task";*/

          	var tasks = {
          		data: [
          			{
          				id: 1, text: "The Climate Initiative",    start_date: "01-01-2019", duration: 18, order: 10,
          				progress: 0.4, open: true
          			},
          			{
          				id: 2, text: "States lead", start_date: "02-04-2018", duration: 8, order: 10,
          				progress: 0.6, parent: 1
          			},
          			{
          				id: 3, text: "Beyond coal & gas builds", start_date: "11-04-2018", duration: 8, order: 20,
          				progress: 0.6, parent: 1
          			},
          			{
          				id: 4, text: "Federal ALP commits", start_date: "11-04-2018", duration: 8, order: 20,
          				progress: 0.6, parent: 1
          			},
          			{
          				id: 5, text: "Climate an election issue", start_date: "11-04-2018", duration: 8, order: 20,
          				progress: 0.6, parent: 1
          			},
          			{
          				id: 6, text: "Mines abandoned", start_date: "11-04-2018", duration: 8, order: 20,
          				progress: 0.6, parent: 1
          			},
          			{
          				id: 7, text: "Climate contest", start_date: "11-04-2018", duration: 8, order: 20,
          				progress: 0.6, parent: 1
          			}
  		      ]};

  	    gantt.init(el);


  	    gantt.parse(tasks);

  	    if (HTMLWidgets.shinyMode) {

          var data = JSON.stringify(gantt.serialize());

  	      gantt.attachEvent("onAfterTaskUpdate", function(id, item) {

              //var data = gantt.serialize();

              Shiny.onInputChange(
                elementId + "_data", JSON.stringify(gantt.serialize())
              );
          });

          gantt.attachEvent("onAfterTaskAdd", function(id,item){

              Shiny.onInputChange(
                elementId + "_data", JSON.stringify(gantt.serialize())
              );

          });



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
      }

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
        {text: message.initiative,
        start_date:"11-04-2018",
        duration:28});
    }
  });
}
