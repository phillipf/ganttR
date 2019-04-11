#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
ganttR <- function(data, width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  #x = list(
  #  message = message
  #)

  #data <- paste(readLines(json), collapse="\n")
  #items <- dataframeToD3(data)
  x <- list(
    data = jsonlite::toJSON(data)
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'ganttR',
    x,
    #"gantt_here",
    width = width,
    height = height,
    package = 'ganttR',
    elementId = elementId
  )
}

#' Shiny bindings for ganttR
#'
#' Output and render functions for using ganttR within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a ganttR
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name ganttR-shiny
#'
#' @export
ganttROutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'ganttR', width, height, package = 'ganttR')
}

#' @rdname ganttR-shiny
#' @export
renderGanttR <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, ganttROutput, env, quoted = TRUE)
}

#' @export
callJS <- function() {
  message <- Filter(function(x) !is.symbol(x), as.list(parent.frame(1)))
  session <- shiny::getDefaultReactiveDomain()
  method <- paste0("ganttR:", message$method)
  session$sendCustomMessage(method, message)
}

#' @export
addTask <- function(id, description, criticalStep, start, duration) {
  message <- list(id = id, description = description, criticalStep = criticalStep, start = start, duration = duration)
  # if (!missing(options)) {
  #   message['options'] <- options
  # }
  session <- shiny::getDefaultReactiveDomain()
  session$sendCustomMessage("ganttR:addTask", message)
}

#' @export
loadScenario <- function(id, data) {
  message <- list(id = id, data = list(data = jsonlite::toJSON(data)))
  # if (!missing(options)) {
  #   message['options'] <- options
  # }
  session <- shiny::getDefaultReactiveDomain()
  session$sendCustomMessage("ganttR:loadScenario", message)
}

.onLoad <- function(libname, pkgname) {
  # register a handler to decode the timeline data passed from JS to R
  # because the default way of decoding it in shiny flattens a data.frame
  # to a vector
  shiny::registerInputHandler("ganttRDF", function(data, ...) {
    jsonlite::fromJSON(jsonlite::toJSON(data, auto_unbox = TRUE))
  }, force = TRUE)
}
