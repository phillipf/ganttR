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

       if (!initialized) {
          initialized = true;


          var taskId = null;

          //var htmlObject = temp.firstChild;

          /*gantt.showLightbox = function(id) {
              taskId = id;
              var task = gantt.getTask(id);

              //var form = document.getElementById("my-form");
              //var form = document.getForm(myHTML);
              var input = form.querySelector("[name='description']");
              input.focus();
              input.value = task.text;

              form.style.display = "block";

              function save() {
                  var task = gantt.getTask(taskId);

                  task.text = form.querySelector("[name='description']").value;

                  if(task.$new){
                      gantt.addTask(task,task.parent);
                  }else{
                      gantt.updateTask(task.id);
                  }

                  gantt.hideLightbox();
              }

              function cancel() {
                  var task = gantt.getTask(taskId);

                  if(task.$new)
                  gantt.deleteTask(task.id);
                  gantt.hideLightbox();
              }

              function remove() {
                  gantt.deleteTask(taskId);
                  gantt.hideLightbox();
              }

              form.querySelector("[name='save']").onclick = save;
              form.querySelector("[name='close']").onclick = cancel;
              form.querySelector("[name='delete']").onclick = remove;
          };

          gantt.hideLightbox = function(){
              form.style.display = "";
              taskId = null;
          };*/

          	var tasks = {
          		data: [
          			{
          				id: 1, text: "#StopAdani",    start_date: "01-01-2019", duration: 18, order: 10,
          				progress: 0.4, open: true
          			},
          			{
          				id: 2, text: "Repower Australia", start_date: "02-04-2018", duration: 8, order: 10,
          				progress: 0.6, open: true
          			},
          			{
          				id: 3, text: "Laws that protect life", start_date: "11-04-2018", duration: 8, order: 20,
          				progress: 0.6, open: true
          			},
          			{
          				id: 4, text: "Be nuclear free", start_date: "11-04-2018", duration: 8, order: 20,
          				progress: 0.6, open: true
          			},
          			{
          				id: 5, text: "A million conversations", start_date: "11-04-2018", duration: 8, order: 20,
          				progress: 0.6, open: true
          			},
          			{
          				id: 6, text: "Strong Democracy", start_date: "11-04-2018", duration: 8, order: 20,
          				progress: 0.6, open: true
          			},
          			{
          				id: 7, text: "Economy for Life", start_date: "11-04-2018", duration: 8, order: 20,
          				progress: 0.6, open: true
          			},
          			{
          				id: 8, text: "Protected Areas", start_date: "11-04-2018", duration: 8, order: 20,
          				progress: 0.6, open: true
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
        {text: message.description,
        start_date: message.start,
        duration: message.duration});
    }
  });
}
