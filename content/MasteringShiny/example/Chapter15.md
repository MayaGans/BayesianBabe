---
date: "2020-03-27T00:00:00+01:00"
draft: false
linktitle: Chapter 15
menu:
  example:
    weight: 15
title: Chapter 15
toc: true
type: docs
weight: 14
---
  
<div class="note">
All questions answered using the module framework prior to Shiny 1.5.0!
</div>

# 15.6.1
  
The following app plots user selected variables from the `msleep` dataset for three different types of mammals (carnivores, omnivores, and herbivores), with one tab for each type of mammal. Remove the redundancy in the `selectInput()` definitions with the use of functions

```{r, eval=FALSE}
library(tidyverse)

ui <- fluidPage(
  selectInput(inputId = "x",
              label = "X-axis:",
              choices = c("sleep_total", "sleep_rem", "sleep_cycle", 
                          "awake", "brainwt", "bodywt"),
              selected = "sleep_rem"),
  selectInput(inputId = "y",
              label = "Y-axis:",
              choices = c("sleep_total", "sleep_rem", "sleep_cycle", 
                          "awake", "brainwt", "bodywt"),
              selected = "sleep_total"),
  tabsetPanel(id = "vore",
              tabPanel("Carnivore",
                       plotOutput("plot_carni")),
              tabPanel("Omnivore",
                       plotOutput("plot_omni")),
              tabPanel("Herbivore",
                       plotOutput("plot_herbi")))
)

server <- function(input, output, session) {

  # make subsets
  carni <- reactive( filter(msleep, vore == "carni") )
  omni  <- reactive( filter(msleep, vore == "omni")  )
  herbi <- reactive( filter(msleep, vore == "herbi") )

  # make plots
  output$plot_carni <- renderPlot({
    ggplot(data = carni(), aes_string(x = input$x, y = input$y)) +
      geom_point()
  })
  output$plot_omni <- renderPlot({
    ggplot(data = omni(), aes_string(x = input$x, y = input$y)) +
      geom_point()
  })
  output$plot_herbi <- renderPlot({
    ggplot(data = herbi(), aes_string(x = input$x, y = input$y)) +
      geom_point()
  })

}

shinyApp(ui = ui, server = server)
```

```{r, eval=FALSE}
library(tidyverse)

axes <- function(label) {
    selectInput(inputId = label, label = paste(label, "-axis"),
                choices = c("sleep_total", "sleep_rem", "sleep_cycle", 
                            "awake", "brainwt", "bodywt"),
                selected = "sleep_rem")
}

ui <- fluidPage(
    axes("x"),
    axes("y"),
    tabsetPanel(id = "vore",
                tabPanel("Carnivore",
                         plotOutput("plot_carni")),
                tabPanel("Omnivore",
                         plotOutput("plot_omni")),
                tabPanel("Herbivore",
                         plotOutput("plot_herbi")))
)

server <- function(input, output, session) {
    
    # make subsets
    carni <- reactive( filter(msleep, vore == "carni") )
    omni  <- reactive( filter(msleep, vore == "omni")  )
    herbi <- reactive( filter(msleep, vore == "herbi") )
    
    # make plots
    output$plot_carni <- renderPlot({
        ggplot(data = carni(), aes_string(x = input$x, y = input$y)) +
            geom_point()
    })
    output$plot_omni <- renderPlot({
        ggplot(data = omni(), aes_string(x = input$x, y = input$y)) +
            geom_point()
    })
    output$plot_herbi <- renderPlot({
        ggplot(data = herbi(), aes_string(x = input$x, y = input$y)) +
            geom_point()
    })
    
}

shinyApp(ui = ui, server = server)
```

# 15.6.2

Continue working with the same app from the previous exercise, and further remove redundancy in the code by modularizing how subsets and plots are created.

```{r, eval=FALSE}
library(tidyverse)

axesInput <- function(id, label) {
  selectInput(inputId = id, label = label,
              choices = c("sleep_total", "sleep_rem", "sleep_cycle", "awake", "brainwt", "bodywt"), 
              selected = "sleep_rem")
}


# -----------------------
# PlotModule
# -----------------------
plotServer <- function(input, output, session, vore, x, y) {

  diet <- reactive({ filter(msleep, vore == vore()) })

  renderPlot({
    ggplot(data = diet(), aes_string(x = x(), y = y())) +
      geom_point()
  })
}

# ------------------
# App.R
# ------------------
ui <- fluidPage(
  axesInput("x", "x-axis"),
  axesInput("y", "y-axis"),
  tabsetPanel(id = "vore",
              tabPanel("Carnivore", plotOutput("plot_carni")),
              tabPanel("Omnivore",  plotOutput("plot_omni")),
              tabPanel("Herbivore", plotOutput("plot_herbi"))
  )
)

server <- function(input, output, session) {
  x <- reactive(input$x)
  y <- reactive(input$y)

  output$plot_carni <- callModule(plotServer, "carniPlot", reactive("carni"), x, y)
  output$plot_omni <- callModule(plotServer, "omniPlot", reactive("omni"), x, y)
  output$plot_herbi <- callModule(plotServer, "herbiPlot", reactive("herbi"), x, y)
}
 

shinyApp(ui = ui, server = server)
```

# 15.6.3

Suppose you have an app that is slow to launch when a user visits it. Can
modularizing your app code help solve this problem? Explain your reasoning.

No, we're just packaging our code into neater functions - this doesn't change or optimize what is loaded when the app is launched. In fact, modularizing might even make your application slower in some cases. 

# 15.6.4

Example passing `input$foo` to reactive and it not working.

If we change our server function in question 2 from

```{r, eval=FALSE}
  carni <- callModule(plotServer, "plot_carni", reactive("carni"), input$x, y)
  omni <- callModule(plotServer, "plot_omni", reactive("omni"), input$x, y)
  herbi <- callModule(plotServer, "plot_herbi", reactive("herbi"), input$x, y)
```

To 

```{r, eval=FALSE}
  carni <- callModule(plotServer, "plot_carni", "carni", x, y)
  omni <- callModule(plotServer, "plot_omni", "omni", x, y)
  herbi <- callModule(plotServer, "plot_herbi", "herbi", x, y)
```

The x-axis will not update! I think this may be what this question is referring to? 


# 15.6.5

The following module input provides a text control that lets you type a date in ISO8601 format (yyyy-mm-dd). Complete the module by providing a server function that uses the “error” output to display a message if the entered value is not a valid date. You can use `strptime(x, "%Y-%m-%d")` to parse the string; it will return `NA` if the value isn’t a valid date.

```{r, eval=FALSE}
ymdDateInput <- function(id, label) {
  label <- paste0(label, " (yyyy-mm-dd)")

  fluidRow(
    textInput(NS(id, "date"), label),
    textOutput(NS(id, "error"))
  )
}
```

```{r, eval=FALSE}
library(shiny)

ymdDateInputUI <- function(id, label) {
    label <- paste0(label, " (yyyy-mm-dd)")
    
    fluidRow(
        textInput(NS(id, "date"), label),
        textOutput(NS(id, "error"))
    )
}

ymdDateInput <- function(input, output, session) {
    
    output$error <- renderText({
        req(input$date)
        d <- try( as.Date( input$date, format= "%Y-%m-%d" ) )
        if( class( d ) == "try-error" || is.na( d ) ) "Not a valid date"
    })
}

ui <- fluidPage(
    ymdDateInputUI("dateEntry", "Date")
)

server <- function(input, output, session) {
    callModule(ymdDateInput, "dateEntry")
}

shinyApp(ui, server)
```

# 15.6.6

Rewrite `selectVarServer()` so that both `data` and `filter` are reactive. Pair it with a app function that lets the user pick the `dataset` with the dataset module, a function with an `inputSelect()` that lets the user filter for numeric, character, or factor variables.

```{r, eval=FALSE}
library(shiny)

#------------------------------------
# Functions
#------------------------------------

find_vars <- function(data, filter) {
  names(data)[vapply(data, filter, logical(1))]
}

#------------------------------------
# Dataset Module
#------------------------------------

datasetInput <- function(id, filter) {
  names <- ls("package:datasets")
  if (!is.null(filter)) {
    data <- lapply(names, get, "package:datasets")
    names <- names[vapply(data, filter, logical(1))]
  }
  selectInput(NS(id, "dataset"), "Pick a dataset", choices = names)
}

 

datasetServer <- function(input, output, session) {
  reactive(get(input$dataset, "package:datasets"))
}

#------------------------------------
# Filter module
#------------------------------------

selectFilterInput <- function(id) {
  selectInput(NS(id, "filt"), "Filter by", choices = c("character", "numeric", "factor"))
}

 

selectFilterServer <- function(input, output, session) {
  reactive({
    switch(input$filt,
           "numeric" = is.numeric,
           "character" = is.character,
           "factor" = is.factor
  })
}

#------------------------------------
# Variable module
#------------------------------------

selectVarInput <- function(id) {
  selectInput(NS(id, "var"), "Variable", choices = NULL)
}

selectVarServer <- function(input, output, session, data, filter) {
  observeEvent(c(data(), filter()), {
    updateSelectInput(session, "var", choices = find_vars(data(), filter()))
  })

  reactive(data()[[input$var]])
}

 

 

#------------------------------------
# App.R
#------------------------------------

ui <- fluidPage(
  datasetInput("data", is.data.frame),
  selectVarInput("var"),
  selectFilterInput("filt"),
  verbatimTextOutput("out")
)

server <- function(input, output, session) {
  filt <- callModule(selectFilterServer, "filt")
  data <- callModule(datasetServer, "data")
  var <- callModule(selectVarServer, "var", data, filt)
  output$out <- renderPrint(var())
}

shinyApp(ui = ui, server = server)
```

# 15.6.7

The following code defines output and server components of a module that takes a numeric input and produces a bulleted list of three summary statistics. Create an app function that allows you to experiment with it. The app function should take a data frame as input, and use `numericVarSelectInput()` to pick the variable to summarise.

```{r, eval=FALSE}
```


<style>
p {
  font-size: 12px;
}

pre {
    background-color: #bed3ec;
    border: solid 5px #dfedff;
    color: #1f5386;
    padding: 5px;
}

tt {
  background-color: #bed3ec;
}

code {
  background-color: #bed3ec;
  color: #1f5386;
}

#TableOfContents {
  padding-left: 10px;
}

#TableOfContents li a, .toc-top li a {
    display: block;
    padding: .125rem 1.5rem;
    color: #436E9A;
}

body {
 background-color: #FFFFE0;
}

.docs-sidebar .docs-toc-item.active a, .docs-sidebar .nav>.active:hover>a, .docs-sidebar .nav>.active>a {
    font-weight: 700;
    color: #436E9A;
    background-color: transparent;
}

.note {
    padding: 1em;
    margin: 1em 0;
    padding-left: 100px;
    background-size: 70px;
    background-repeat: no-repeat;
    background-position: 15px center;
    min-height: 120px;
    color: #1f5386;
    background-color: #cae7c1;
    border: solid 5px #c3dac3;
    font-size: 15px;
  }
  
.note {
  background-image: url("/img/question.png");
}

</style>