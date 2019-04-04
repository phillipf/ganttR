HTMLWidgets.widget({

  name: 'ganttR',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        // TODO: code to render the widget, e.g.
        //el.innerText = x.message;
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
        //gantt.init(el);
      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
